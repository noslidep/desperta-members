import { createClient } from './supabase/server'

export async function assertAdmin(){
 const supabase=await createClient()
 const {data:{user}}=await supabase.auth.getUser()
 if(!user) throw new Error('Sessão expirada. Entre novamente.')
 const {data:profile}=await supabase.from('profiles').select('role').eq('id',user.id).maybeSingle()
 if(profile?.role!=='admin') throw new Error('Acesso administrativo negado.')
 return user
}
