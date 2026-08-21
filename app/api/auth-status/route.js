import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient, isDemo } from '../../../lib/supabase/server'

export async function GET() {
  if (isDemo()) return NextResponse.json({ demo: true, authenticated: false })
  const cookieStore = await cookies()
  const authCookieNames = cookieStore.getAll().map(c => c.name).filter(name => name.startsWith('sb-'))
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  return NextResponse.json({
    demo: false,
    authenticated: Boolean(user),
    email: user?.email || null,
    authCookies: authCookieNames,
    authError: error?.message || null,
  })
}
