import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

function safeNext(value) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/definir-senha'
  return value
}

function cleanRedirect(request, pathname, error = '') {
  const url = request.nextUrl.clone()
  url.pathname = pathname
  url.search = ''
  url.hash = ''
  if (error) url.searchParams.set('erro', error)
  return url
}

// Endpoint SSR para links de e-mail com TokenHash.
// Funciona em qualquer navegador/dispositivo e não depende do code_verifier local do PKCE.
export async function GET(request) {
  const tokenHash = request.nextUrl.searchParams.get('token_hash')
  const type = request.nextUrl.searchParams.get('type')
  const next = safeNext(request.nextUrl.searchParams.get('next'))

  if (!tokenHash || !type) {
    return NextResponse.redirect(
      cleanRedirect(request, '/recuperar-senha', 'O link de acesso está incompleto. Solicite um novo link.')
    )
  }

  let response = NextResponse.redirect(cleanRedirect(request, next))

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type,
  })

  if (error) {
    return NextResponse.redirect(
      cleanRedirect(
        request,
        '/recuperar-senha',
        'Este link expirou, já foi utilizado ou não pôde ser validado. Solicite um novo link.'
      )
    )
  }

  return response
}
