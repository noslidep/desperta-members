'use server'

import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {createAdminClient} from '../../../lib/supabase/admin'
import {isDemo} from '../../../lib/supabase/server'
import {assertAdmin} from '../../../lib/admin-auth'

function expiryFromDate(value){
 const v=String(value||'').trim()
 return v ? `${v}T23:59:59-03:00` : null
}

function adminStudentsUrl(params={}){
 const q=new URLSearchParams()
 Object.entries(params).forEach(([key,value])=>{if(value)q.set(key,String(value))})
 return `/admin/alunas${q.size?`?${q.toString()}`:''}`
}

function studentUrl(studentId,params={}){
 const q=new URLSearchParams()
 Object.entries(params).forEach(([key,value])=>{if(value)q.set(key,String(value))})
 return `/admin/alunas/${studentId}${q.size?`?${q.toString()}`:''}`
}

export async function inviteStudent(formData){
 if(isDemo())return
 await assertAdmin()
 const email=String(formData.get('email')||'').trim().toLowerCase()
 const fullName=String(formData.get('full_name')||'').trim()
 if(!email)redirect(adminStudentsUrl({error:'Informe o e-mail da aluna.'}))
 const admin=createAdminClient()
 const appUrl=(process.env.NEXT_PUBLIC_APP_URL||'').replace(/\/$/,'')
 // O link do convite abre uma rota pública. O navegador conclui a sessão e a aluna cria a própria senha.
 const redirectTo=appUrl?`${appUrl}/definir-senha`:undefined
 const{data,error}=await admin.auth.admin.inviteUserByEmail(email,{data:{full_name:fullName},redirectTo})
 if(error)redirect(adminStudentsUrl({error:error.message}))
 if(data?.user){
  const{error:profileError}=await admin.from('profiles').upsert({id:data.user.id,email,full_name:fullName,role:'student'})
  if(profileError)redirect(adminStudentsUrl({error:profileError.message}))
 }
 revalidatePath('/admin/alunas')
 redirect(adminStudentsUrl({invited:'1'}))
}

export async function updateStudentProfile(formData){
 if(isDemo())return
 await assertAdmin()
 const studentId=String(formData.get('student_id')||'')
 const fullName=String(formData.get('full_name')||'').trim()
 const email=String(formData.get('email')||'').trim().toLowerCase()
 const phone=String(formData.get('phone')||'').trim()
 if(!studentId)return
 if(!email)redirect(studentUrl(studentId,{error:'Informe um e-mail válido.'}))
 const admin=createAdminClient()
 const{data:student,error:studentError}=await admin.from('profiles').select('id,email,role').eq('id',studentId).maybeSingle()
 if(studentError)redirect(studentUrl(studentId,{error:studentError.message}))
 if(!student || student.role!=='student')redirect(adminStudentsUrl({error:'Aluna não encontrada.'}))

 const authChanges={user_metadata:{full_name:fullName}}
 if(email!==String(student.email||'').toLowerCase()){
  authChanges.email=email
  authChanges.email_confirm=true
 }
 const{error:authError}=await admin.auth.admin.updateUserById(studentId,authChanges)
 if(authError)redirect(studentUrl(studentId,{error:authError.message}))

 const{error}=await admin.from('profiles').update({full_name:fullName,email,phone,updated_at:new Date().toISOString()}).eq('id',studentId).eq('role','student')
 if(error)redirect(studentUrl(studentId,{error:error.message}))
 revalidatePath('/admin/alunas')
 revalidatePath(`/admin/alunas/${studentId}`)
 redirect(studentUrl(studentId,{profile:'1'}))
}

export async function sendStudentPasswordLink(formData){
 if(isDemo())return
 await assertAdmin()
 const studentId=String(formData.get('student_id')||'')
 if(!studentId)return
 const admin=createAdminClient()
 const{data:student,error:studentError}=await admin.from('profiles').select('id,email,role').eq('id',studentId).maybeSingle()
 if(studentError)redirect(studentUrl(studentId,{error:studentError.message}))
 if(!student || student.role!=='student' || !student.email)redirect(studentUrl(studentId,{error:'Aluna ou e-mail não encontrado.'}))
 const appUrl=(process.env.NEXT_PUBLIC_APP_URL||'').replace(/\/$/,'')
 const redirectTo=appUrl?`${appUrl}/definir-senha`:undefined
 const{error}=await admin.auth.resetPasswordForEmail(student.email,{redirectTo})
 if(error)redirect(studentUrl(studentId,{error:error.message}))
 redirect(studentUrl(studentId,{password:'1'}))
}

export async function deleteStudent(formData){
 if(isDemo())return
 await assertAdmin()
 const studentId=String(formData.get('student_id')||'')
 if(!studentId)return
 const admin=createAdminClient()
 const{data:student,error:studentError}=await admin.from('profiles').select('id,full_name,email,role').eq('id',studentId).maybeSingle()
 if(studentError)redirect(studentUrl(studentId,{error:studentError.message}))
 if(!student || student.role!=='student')redirect(adminStudentsUrl({error:'Aluna não encontrada ou não pode ser excluída.'}))
 // auth.users é a raiz da conta. As tabelas profiles/enrollments/progresso usam cascade no schema.
 const{error}=await admin.auth.admin.deleteUser(studentId)
 if(error)redirect(studentUrl(studentId,{error:error.message}))
 revalidatePath('/admin/alunas')
 redirect(adminStudentsUrl({deleted:'1'}))
}

export async function saveStudentAccess(formData){
 if(isDemo())return
 await assertAdmin()
 const studentId=String(formData.get('student_id')||'')
 if(!studentId)return
 const admin=createAdminClient()
 const{data:student,error:studentError}=await admin.from('profiles').select('id,role').eq('id',studentId).maybeSingle()
 if(studentError)redirect(studentUrl(studentId,{error:studentError.message}))
 if(!student || student.role!=='student')redirect(adminStudentsUrl({error:'Aluna não encontrada.'}))
 const{data:programs,error:programError}=await admin.from('programs').select('id')
 if(programError)redirect(studentUrl(studentId,{error:programError.message}))

 for(const p of programs||[]){
  const status=String(formData.get(`status__${p.id}`)||'none')
  const expiresAt=expiryFromDate(formData.get(`expires__${p.id}`))
  if(status==='none'){
   const{error}=await admin.from('enrollments').delete().eq('user_id',studentId).eq('program_id',p.id)
   if(error)redirect(studentUrl(studentId,{error:error.message}))
   continue
  }
  if(!['active','paused','cancelled','completed'].includes(status))continue
  const{error}=await admin.from('enrollments').upsert({
   user_id:studentId,
   program_id:p.id,
   status,
   expires_at:expiresAt,
   source:'admin'
  },{onConflict:'user_id,program_id'})
  if(error)redirect(studentUrl(studentId,{error:error.message}))
 }
 revalidatePath('/admin/alunas')
 revalidatePath(`/admin/alunas/${studentId}`)
 redirect(studentUrl(studentId,{saved:'1'}))
}

export async function bulkUpdateAccess(formData){
 if(isDemo())return
 await assertAdmin()
 const ids=formData.getAll('student_ids').map(String).filter(Boolean)
 const programId=String(formData.get('program_id')||'')
 const status=String(formData.get('bulk_status')||'active')
 const expiresAt=expiryFromDate(formData.get('bulk_expires'))
 if(!ids.length || !programId)redirect(adminStudentsUrl({error:'Selecione pelo menos uma aluna e um programa.'}))
 const admin=createAdminClient()

 if(status==='none'){
  const{error}=await admin.from('enrollments').delete().in('user_id',ids).eq('program_id',programId)
  if(error)redirect(adminStudentsUrl({error:error.message}))
 }else{
  if(!['active','paused','cancelled','completed'].includes(status))redirect(adminStudentsUrl({error:'Status inválido.'}))
  const rows=ids.map(user_id=>({user_id,program_id:programId,status,expires_at:expiresAt,source:'admin'}))
  const{error}=await admin.from('enrollments').upsert(rows,{onConflict:'user_id,program_id'})
  if(error)redirect(adminStudentsUrl({error:error.message}))
 }
 revalidatePath('/admin/alunas')
 redirect(adminStudentsUrl({bulk:'1'}))
}
