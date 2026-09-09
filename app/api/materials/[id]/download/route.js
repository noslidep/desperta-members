import { NextResponse } from 'next/server'
import { createClient } from '../../../../../lib/supabase/server'
import { createAdminClient } from '../../../../../lib/supabase/admin'
import { parseStorageUri } from '../../../../../lib/storage'

function enrollmentIsCurrent(row) {
  if (!row || !['active', 'completed'].includes(row.status)) return false
  if (!row.expires_at) return true
  return new Date(row.expires_at).getTime() > Date.now()
}

function safeExternalUrl(value, requestUrl) {
  const raw = String(value || '').trim()
  if (!raw) return null

  if (raw.startsWith('/')) return new URL(raw, requestUrl)

  try {
    const url = new URL(raw)
    if (!['http:', 'https:'].includes(url.protocol)) return null
    return url
  } catch {
    return null
  }
}

export async function GET(request, { params }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const { data: material } = await supabase
    .from('materials')
    .select('id,program_id,file_url,status')
    .eq('id', id)
    .eq('status', 'published')
    .maybeSingle()

  if (!material) {
    return new NextResponse('Material não encontrado.', { status: 404 })
  }

  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('status,expires_at')
    .eq('user_id', user.id)
    .eq('program_id', material.program_id)
    .in('status', ['active', 'completed'])
    .maybeSingle()

  if (!enrollmentIsCurrent(enrollment)) {
    return new NextResponse('Acesso não autorizado.', { status: 403 })
  }

  const storageRef = parseStorageUri(material.file_url)
  if (storageRef) {
    const admin = createAdminClient()
    const { data, error } = await admin.storage
      .from(storageRef.bucket)
      .createSignedUrl(storageRef.path, 300, { download: true })

    if (error || !data?.signedUrl) {
      console.error('Falha ao assinar material', error)
      return new NextResponse('Não foi possível abrir este material.', { status: 502 })
    }

    return NextResponse.redirect(data.signedUrl)
  }

  const externalUrl = safeExternalUrl(material.file_url, request.url)
  if (!externalUrl) {
    return new NextResponse('Endereço do material inválido.', { status: 422 })
  }

  return NextResponse.redirect(externalUrl)
}
