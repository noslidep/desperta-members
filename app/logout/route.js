import { NextResponse } from 'next/server'
import { createClient,isDemo } from '../../lib/supabase/server'
export async function GET(request){
 if(!isDemo()){const s=await createClient();await s.auth.signOut()}
 return NextResponse.redirect(new URL('/login',request.url))
}
