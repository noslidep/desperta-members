'use server'

import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {createAdminClient} from '../../../lib/supabase/admin'
import {isDemo} from '../../../lib/supabase/server'
import {assertAdmin} from '../../../lib/admin-auth'

const CONTENT_TYPES=new Set(['course','mentoring','immersion','training','event','community'])
const PROGRAM_STATUS=new Set(['draft','published','coming_soon','archived'])
const CHILD_STATUS=new Set(['draft','published'])

function text(formData,key){return String(formData.get(key)||'').trim()}
function integer(value,fallback=0){const n=Number.parseInt(String(value??''),10);return Number.isFinite(n)?n:fallback}
function nonNegativeInteger(value,fallback=0){const n=Number(String(value??'').replace(',','.'));return Number.isFinite(n)?Math.max(0,Math.round(n)):fallback}
function checkbox(formData,key){return formData.get(key)==='on'||formData.get(key)==='true'||formData.get(key)==='1'}
function slugify(value){return String(value||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,120)}
function programUrl(id,params={}){const q=new URLSearchParams();for(const[k,v]of Object.entries(params)){if(v!==undefined&&v!==null&&v!=='')q.set(k,String(v))}return `/admin/programas/${id}${q.size?`?${q}`:''}`}
function listUrl(params={}){const q=new URLSearchParams();for(const[k,v]of Object.entries(params)){if(v!==undefined&&v!==null&&v!=='')q.set(k,String(v))}return `/admin/programas${q.size?`?${q}`:''}`}
function nullableDateTime(value){const v=String(value||'').trim();return v?new Date(v).toISOString():null}

async function admin(){await assertAdmin();return createAdminClient()}

export async function createProgram(formData){
 if(isDemo())return
 const db=await admin()
 const title=text(formData,'title')
 const slug=slugify(text(formData,'slug')||title)
 const contentType=text(formData,'content_type')||'course'
 const status=text(formData,'status')||'draft'
 if(!title)redirect(listUrl({error:'Informe o título do conteúdo.'}))
 if(!slug)redirect(listUrl({error:'Não foi possível gerar um slug válido.'}))
 if(!CONTENT_TYPES.has(contentType)||!PROGRAM_STATUS.has(status))redirect(listUrl({error:'Tipo ou status inválido.'}))
 const row={title,slug,content_type:contentType,status,catalog_visible:checkbox(formData,'catalog_visible'),position:integer(formData.get('position')),subtitle:text(formData,'subtitle')||null,description:text(formData,'description')||null,cover_url:text(formData,'cover_url')||null,updated_at:new Date().toISOString()}
 const{data,error}=await db.from('programs').insert(row).select('id').single()
 if(error)redirect(listUrl({error:error.message}))
 revalidatePath('/admin/programas');revalidatePath('/programas');revalidatePath('/dashboard')
 redirect(programUrl(data.id,{created:'1'}))
}

export async function updateProgram(formData){
 if(isDemo())return
 const db=await admin();const id=text(formData,'program_id');if(!id)return
 const title=text(formData,'title');const slug=slugify(text(formData,'slug')||title);const contentType=text(formData,'content_type');const status=text(formData,'status')
 if(!title||!slug)redirect(programUrl(id,{error:'Título e slug são obrigatórios.'}))
 if(!CONTENT_TYPES.has(contentType)||!PROGRAM_STATUS.has(status))redirect(programUrl(id,{error:'Tipo ou status inválido.'}))
 const{error}=await db.from('programs').update({title,slug,content_type:contentType,status,catalog_visible:checkbox(formData,'catalog_visible'),position:integer(formData.get('position')),subtitle:text(formData,'subtitle')||null,description:text(formData,'description')||null,cover_url:text(formData,'cover_url')||null,updated_at:new Date().toISOString()}).eq('id',id)
 if(error)redirect(programUrl(id,{error:error.message}))
 revalidatePath('/admin/programas');revalidatePath(programUrl(id));revalidatePath('/programas');revalidatePath('/dashboard')
 redirect(programUrl(id,{saved:'1'}))
}

export async function deleteProgram(formData){
 if(isDemo())return
 const db=await admin();const id=text(formData,'program_id');if(!id)return
 const{count,error:countError}=await db.from('enrollments').select('id',{count:'exact',head:true}).eq('program_id',id)
 if(countError)redirect(programUrl(id,{error:countError.message}))
 if((count||0)>0)redirect(programUrl(id,{error:'Este conteúdo possui matrículas. Remova ou transfira os acessos antes de excluir.'}))
 const{error}=await db.from('programs').delete().eq('id',id)
 if(error)redirect(programUrl(id,{error:error.message}))
 revalidatePath('/admin/programas');revalidatePath('/programas');revalidatePath('/dashboard')
 redirect(listUrl({deleted:'1'}))
}

export async function createModule(formData){
 if(isDemo())return
 const db=await admin();const programId=text(formData,'program_id');const title=text(formData,'title');const status=text(formData,'status')||'published'
 if(!programId||!title)redirect(programUrl(programId,{error:'Informe o título do módulo.'}))
 if(!CHILD_STATUS.has(status))redirect(programUrl(programId,{error:'Status de módulo inválido.'}))
 const{error}=await db.from('modules').insert({program_id:programId,title,description:text(formData,'description')||null,position:integer(formData.get('position')),status})
 if(error)redirect(programUrl(programId,{error:error.message}))
 revalidatePath(programUrl(programId));redirect(programUrl(programId,{module_created:'1'}))
}

export async function updateModule(formData){
 if(isDemo())return
 const db=await admin();const programId=text(formData,'program_id');const id=text(formData,'module_id');const title=text(formData,'title');const status=text(formData,'status')
 if(!id||!programId||!title)redirect(programUrl(programId,{error:'Dados do módulo incompletos.'}))
 const{error}=await db.from('modules').update({title,description:text(formData,'description')||null,position:integer(formData.get('position')),status:CHILD_STATUS.has(status)?status:'published'}).eq('id',id).eq('program_id',programId)
 if(error)redirect(programUrl(programId,{error:error.message}))
 revalidatePath(programUrl(programId));redirect(programUrl(programId,{module_saved:'1'}))
}

export async function deleteModule(formData){
 if(isDemo())return
 const db=await admin();const programId=text(formData,'program_id');const id=text(formData,'module_id');if(!id)return
 const{count,error:countError}=await db.from('lessons').select('id',{count:'exact',head:true}).eq('module_id',id)
 if(countError)redirect(programUrl(programId,{error:countError.message}))
 if((count||0)>0)redirect(programUrl(programId,{error:'Este módulo possui aulas. Exclua ou mova as aulas antes de remover o módulo.'}))
 const{error}=await db.from('modules').delete().eq('id',id).eq('program_id',programId)
 if(error)redirect(programUrl(programId,{error:error.message}))
 revalidatePath(programUrl(programId));redirect(programUrl(programId,{module_deleted:'1'}))
}

export async function createLesson(formData){
 if(isDemo())return
 const db=await admin();const programId=text(formData,'program_id');const moduleId=text(formData,'module_id');const title=text(formData,'title');const status=text(formData,'status')||'draft'
 if(!programId||!moduleId||!title)redirect(programUrl(programId,{error:'Módulo e título da aula são obrigatórios.'}))
 const row={program_id:programId,module_id:moduleId,title,summary:text(formData,'summary')||null,description:text(formData,'description')||null,position:integer(formData.get('position')),duration_seconds:nonNegativeInteger(formData.get('duration_seconds')),video_provider:text(formData,'video_provider')||'external',video_url:text(formData,'video_url')||null,poster_url:text(formData,'poster_url')||null,release_at:nullableDateTime(formData.get('release_at')),status:CHILD_STATUS.has(status)?status:'draft',updated_at:new Date().toISOString()}
 const{error}=await db.from('lessons').insert(row)
 if(error)redirect(programUrl(programId,{error:error.message}))
 revalidatePath(programUrl(programId));redirect(programUrl(programId,{lesson_created:'1'}))
}

export async function updateLesson(formData){
 if(isDemo())return
 const db=await admin();const programId=text(formData,'program_id');const id=text(formData,'lesson_id');const moduleId=text(formData,'module_id');const title=text(formData,'title');const status=text(formData,'status')
 if(!id||!programId||!moduleId||!title)redirect(programUrl(programId,{error:'Dados da aula incompletos.'}))
 const durationSeconds=nonNegativeInteger(formData.get('duration_seconds'))
 const payload={module_id:moduleId,title,summary:text(formData,'summary')||null,description:text(formData,'description')||null,position:integer(formData.get('position')),duration_seconds:durationSeconds,video_provider:text(formData,'video_provider')||'external',video_url:text(formData,'video_url')||null,poster_url:text(formData,'poster_url')||null,release_at:nullableDateTime(formData.get('release_at')),status:CHILD_STATUS.has(status)?status:'draft',updated_at:new Date().toISOString()}
 const{data,error}=await db.from('lessons').update(payload).eq('id',id).eq('program_id',programId).select('id,duration_seconds').single()
 if(error)redirect(programUrl(programId,{error:error.message}))
 if(Number(data?.duration_seconds)!==durationSeconds)redirect(programUrl(programId,{error:'A duração da aula não foi persistida corretamente. Tente novamente.'}))
 revalidatePath(programUrl(programId));redirect(programUrl(programId,{lesson_saved:'1'}))
}

export async function deleteLesson(formData){
 if(isDemo())return
 const db=await admin();const programId=text(formData,'program_id');const id=text(formData,'lesson_id');if(!id)return
 const{error}=await db.from('lessons').delete().eq('id',id).eq('program_id',programId)
 if(error)redirect(programUrl(programId,{error:error.message}))
 revalidatePath(programUrl(programId));redirect(programUrl(programId,{lesson_deleted:'1'}))
}

export async function createMaterial(formData){
 if(isDemo())return
 const db=await admin();const programId=text(formData,'program_id');const title=text(formData,'title');const fileUrl=text(formData,'file_url');const status=text(formData,'status')||'published'
 if(!programId||!title||!fileUrl)redirect(programUrl(programId,{error:'Título e URL do material são obrigatórios.'}))
 const{error}=await db.from('materials').insert({program_id:programId,module_id:text(formData,'module_id')||null,lesson_id:text(formData,'lesson_id')||null,title,description:text(formData,'description')||null,file_url:fileUrl,file_type:text(formData,'file_type')||'PDF',status:CHILD_STATUS.has(status)?status:'published'})
 if(error)redirect(programUrl(programId,{error:error.message}))
 revalidatePath(programUrl(programId));redirect(programUrl(programId,{material_created:'1'}))
}

export async function updateMaterial(formData){
 if(isDemo())return
 const db=await admin();const programId=text(formData,'program_id');const id=text(formData,'material_id');const title=text(formData,'title');const fileUrl=text(formData,'file_url');const status=text(formData,'status')
 if(!id||!programId||!title||!fileUrl)redirect(programUrl(programId,{error:'Dados do material incompletos.'}))
 const{error}=await db.from('materials').update({module_id:text(formData,'module_id')||null,lesson_id:text(formData,'lesson_id')||null,title,description:text(formData,'description')||null,file_url:fileUrl,file_type:text(formData,'file_type')||'PDF',status:CHILD_STATUS.has(status)?status:'published'}).eq('id',id).eq('program_id',programId)
 if(error)redirect(programUrl(programId,{error:error.message}))
 revalidatePath(programUrl(programId));redirect(programUrl(programId,{material_saved:'1'}))
}

export async function deleteMaterial(formData){
 if(isDemo())return
 const db=await admin();const programId=text(formData,'program_id');const id=text(formData,'material_id');if(!id)return
 const{error}=await db.from('materials').delete().eq('id',id).eq('program_id',programId)
 if(error)redirect(programUrl(programId,{error:error.message}))
 revalidatePath(programUrl(programId));redirect(programUrl(programId,{material_deleted:'1'}))
}
