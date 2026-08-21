'use server'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {createClient,isDemo} from '../../../lib/supabase/server'

export async function updateMyProfile(formData){
 if(isDemo())return
 const s=await createClient()
 const{data:{user}}=await s.auth.getUser()
 if(!user)redirect('/login')
 const full_name=String(formData.get('full_name')||'').trim()
 const phone=String(formData.get('phone')||'').trim()
 const{error}=await s.from('profiles').update({full_name,phone,updated_at:new Date().toISOString()}).eq('id',user.id)
 if(error)throw error
 revalidatePath('/dashboard')
 revalidatePath('/minha-conta')
 redirect('/minha-conta?saved=1')
}
