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

export async function inviteStudent(formData){
 if(isDemo())return
 await assertAdmin()
 const email=String(formData.get('email')||'').trim().toLowerCase()
 const fullName=String(formData.get('full_name')||'').trim()
 if(!email)return
 const admin=createAdminClient()
 const{data,error}=await admin.auth.admin.inviteUserByEmail(email,{data:{full_name:fullName}})
 if(error)throw error
 if(data?.user)await admin.from('profiles').upsert({id:data.user.id,email,full_name:fullName,role:'student'})
 revalidatePath('/admin/alunas')
}

export async function updateStudentProfile(formData){
 if(isDemo())return
 await assertAdmin()
 const studentId=String(formData.get('student_id')||'')
 const fullName=String(formData.get('full_name')||'').trim()
 const phone=String(formData.get('phone')||'').trim()
 if(!studentId)return
 const admin=createAdminClient()
 const{error}=await admin.from('profiles').update({full_name:fullName,phone}).eq('id',studentId).eq('role','student')
 if(error)throw error
 revalidatePath('/admin/alunas')
 revalidatePath(`/admin/alunas/${studentId}`)
}

export async function saveStudentAccess(formData){
 if(isDemo())return
 await assertAdmin()
 const studentId=String(formData.get('student_id')||'')
 if(!studentId)return
 const admin=createAdminClient()
 const{data:student,error:studentError}=await admin.from('profiles').select('id,role').eq('id',studentId).maybeSingle()
 if(studentError)throw studentError
 if(!student || student.role!=='student')throw new Error('Aluna não encontrada.')
 const{data:programs,error:programError}=await admin.from('programs').select('id')
 if(programError)throw programError

 for(const p of programs||[]){
  const status=String(formData.get(`status__${p.id}`)||'none')
  const expiresAt=expiryFromDate(formData.get(`expires__${p.id}`))
  if(status==='none'){
   const{error}=await admin.from('enrollments').delete().eq('user_id',studentId).eq('program_id',p.id)
   if(error)throw error
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
  if(error)throw error
 }
 revalidatePath('/admin/alunas')
 revalidatePath(`/admin/alunas/${studentId}`)
 redirect(`/admin/alunas/${studentId}?saved=1`)
}

export async function bulkUpdateAccess(formData){
 if(isDemo())return
 await assertAdmin()
 const ids=formData.getAll('student_ids').map(String).filter(Boolean)
 const programId=String(formData.get('program_id')||'')
 const status=String(formData.get('bulk_status')||'active')
 const expiresAt=expiryFromDate(formData.get('bulk_expires'))
 if(!ids.length || !programId)return
 const admin=createAdminClient()

 if(status==='none'){
  const{error}=await admin.from('enrollments').delete().in('user_id',ids).eq('program_id',programId)
  if(error)throw error
 }else{
  if(!['active','paused','cancelled','completed'].includes(status))throw new Error('Status inválido.')
  const rows=ids.map(user_id=>({user_id,program_id:programId,status,expires_at:expiresAt,source:'admin'}))
  const{error}=await admin.from('enrollments').upsert(rows,{onConflict:'user_id,program_id'})
  if(error)throw error
 }
 revalidatePath('/admin/alunas')
}
