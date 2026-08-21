import { createClient,isDemo } from './supabase/server'
import { demoProfile,demoPrograms,demoModules,demoEvents,demoMaterials,demoCertificates,demoAnnouncements } from './demo'
export async function getCurrentProfile(){
 if(isDemo()) return demoProfile
 const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser(); if(!user)return null
 const {data}=await supabase.from('profiles').select('*').eq('id',user.id).single(); return data||{id:user.id,email:user.email,full_name:user.user_metadata?.full_name||user.email}
}
export async function getMyPrograms(){
 if(isDemo()) return demoPrograms
 const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser(); if(!user)return[]
 const {data:rows}=await supabase.from('enrollments').select('program_id,status,programs(*)').eq('user_id',user.id).eq('status','active')
 const results=[]
 for(const row of rows||[]){
  const p=row.programs; const {count:total}=await supabase.from('lessons').select('id',{count:'exact',head:true}).eq('program_id',p.id).eq('status','published')
  const {count:done}=await supabase.from('lesson_progress').select('lesson_id',{count:'exact',head:true}).eq('user_id',user.id).eq('program_id',p.id).eq('completed',true)
  results.push({...p,enrolled:true,total_lessons:total||0,completed_lessons:done||0,progress:total?Math.round(((done||0)/total)*100):0})
 }
 return results
}
export async function getProgramBySlug(slug){
 if(isDemo()){const program=demoPrograms.find(p=>p.slug===slug);return program?{program,modules:demoModules}:null}
 const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser(); if(!user)return null
 const {data:program}=await supabase.from('programs').select('*').eq('slug',slug).eq('status','published').single(); if(!program)return null
 const {data:enrollment}=await supabase.from('enrollments').select('id').eq('user_id',user.id).eq('program_id',program.id).eq('status','active').maybeSingle(); if(!enrollment)return null
 const {data:modules}=await supabase.from('modules').select('*,lessons(*)').eq('program_id',program.id).order('position').order('position',{referencedTable:'lessons'})
 const {data:progress}=await supabase.from('lesson_progress').select('lesson_id,completed').eq('user_id',user.id).eq('program_id',program.id)
 const completed=new Set((progress||[]).filter(x=>x.completed).map(x=>x.lesson_id))
 const mapped=(modules||[]).map(m=>({...m,lessons:(m.lessons||[]).filter(l=>l.status==='published').map(l=>({...l,is_completed:completed.has(l.id)}))}))
 const total=mapped.reduce((n,m)=>n+m.lessons.length,0),done=mapped.reduce((n,m)=>n+m.lessons.filter(l=>l.is_completed).length,0)
 return {program:{...program,total_lessons:total,completed_lessons:done,progress:total?Math.round(done/total*100):0},modules:mapped}
}
export async function getLesson(id){
 if(isDemo()){
  for(const m of demoModules){const lesson=m.lessons.find(l=>l.id===id);if(lesson)return{lesson:{...lesson,program_id:demoPrograms[0].id,module_id:m.id},program:demoPrograms[0],module:m,modules:demoModules}}
  return null
 }
 const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser(); if(!user)return null
 const {data:lesson}=await supabase.from('lessons').select('*').eq('id',id).eq('status','published').single(); if(!lesson)return null
 const {data:enrollment}=await supabase.from('enrollments').select('id').eq('user_id',user.id).eq('program_id',lesson.program_id).eq('status','active').maybeSingle();if(!enrollment)return null
 const [{data:program},{data:module},{data:modules},{data:progress}]=await Promise.all([
  supabase.from('programs').select('*').eq('id',lesson.program_id).single(),supabase.from('modules').select('*').eq('id',lesson.module_id).single(),supabase.from('modules').select('*,lessons(*)').eq('program_id',lesson.program_id).order('position').order('position',{referencedTable:'lessons'}),supabase.from('lesson_progress').select('lesson_id,completed').eq('user_id',user.id).eq('program_id',lesson.program_id)])
 const completed=new Set((progress||[]).filter(x=>x.completed).map(x=>x.lesson_id)); const mapped=(modules||[]).map(m=>({...m,lessons:(m.lessons||[]).filter(l=>l.status==='published').map(l=>({...l,is_completed:completed.has(l.id)}))}))
 return {lesson:{...lesson,is_completed:completed.has(lesson.id)},program,module,modules:mapped}
}
export async function getEvents(){if(isDemo())return demoEvents;const s=await createClient();const{data}=await s.from('events').select('*').eq('status','scheduled').gte('starts_at',new Date().toISOString()).order('starts_at').limit(30);return data||[]}
export async function getMaterials(){if(isDemo())return demoMaterials;const s=await createClient();const{data:{user}}=await s.auth.getUser();if(!user)return[];const{data:enroll}=await s.from('enrollments').select('program_id').eq('user_id',user.id).eq('status','active');const ids=(enroll||[]).map(x=>x.program_id);if(!ids.length)return[];const{data}=await s.from('materials').select('*,programs(title)').in('program_id',ids).eq('status','published').order('created_at',{ascending:false});return(data||[]).map(x=>({...x,program_title:x.programs?.title||''}))}
export async function getCertificates(){if(isDemo())return demoCertificates;const s=await createClient();const{data:{user}}=await s.auth.getUser();if(!user)return[];const{data}=await s.from('certificates').select('*,programs(title)').eq('user_id',user.id).order('created_at',{ascending:false});return(data||[]).map(x=>({...x,program_title:x.programs?.title||''}))}
export async function getAnnouncements(){if(isDemo())return demoAnnouncements;const s=await createClient();const{data}=await s.from('announcements').select('*').eq('status','published').order('published_at',{ascending:false}).limit(5);return data||[]}
export async function getAllProgramsAdmin(){if(isDemo())return demoPrograms;const s=await createClient();const{data}=await s.from('programs').select('*').order('position');return data||[]}
export async function getAdminStats(){if(isDemo())return{students:128,programs:5,enrollments:173,completion:61};const s=await createClient();const [{count:students},{count:programs},{count:enrollments}]=await Promise.all([s.from('profiles').select('id',{count:'exact',head:true}).eq('role','student'),s.from('programs').select('id',{count:'exact',head:true}),s.from('enrollments').select('id',{count:'exact',head:true}).eq('status','active')]);return{students:students||0,programs:programs||0,enrollments:enrollments||0,completion:0}}
