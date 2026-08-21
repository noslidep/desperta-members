import { NextResponse } from 'next/server'
import { createClient, isDemo } from '../../../lib/supabase/server'

export async function GET() {
  if (isDemo()) return NextResponse.json({ demo: true, authenticated: false })
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return NextResponse.json({ demo: false, authenticated: Boolean(user) })
}
