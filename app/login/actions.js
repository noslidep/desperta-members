'use server'
import { redirect } from 'next/navigation';import { createClient,isDemo } from '../../lib/supabase/server'
export async function login(formData){if(isDemo())redirect('/dashboard');const email=String(formData.get('email')||'').trim();const password=String(formData.get('password')||'');const s=await createClient();const{error}=await s.auth.signInWithPassword({email,password});if(error)redirect('/login?erro='+encodeURIComponent(error.message));redirect('/dashboard')}
export async function logout(){if(!isDemo()){const s=await createClient();await s.auth.signOut()}redirect('/login')}
