export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation';import MemberLayout from '../../components/MemberLayout';import { getCurrentProfile } from '../../lib/data';import { isDemo,createClient } from '../../lib/supabase/server'
export default async function Layout({children}){if(!isDemo()){const s=await createClient();const{data:{user}}=await s.auth.getUser();if(!user)redirect('/login')}const profile=await getCurrentProfile();return <MemberLayout profile={profile}>{children}</MemberLayout>}
