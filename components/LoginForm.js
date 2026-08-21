'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../lib/supabase/client'

export default function LoginForm({ demo = false, initialError = '' }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(initialError || '')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (demo) {
      router.replace('/dashboard')
      router.refresh()
      return
    }

    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') || '').trim()
    const password = String(form.get('password') || '')

    setLoading(true)
    try {
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) {
        setError(signInError.message)
        return
      }

      // Confirma que a sessão já foi persistida no navegador antes de navegar.
      const { data } = await supabase.auth.getSession()
      if (!data?.session) {
        setError('Não foi possível persistir a sessão. Tente entrar novamente.')
        return
      }

      router.replace('/dashboard')
      router.refresh()
    } catch (err) {
      setError(err?.message || 'Não foi possível entrar agora.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>E-mail</label>
          <input name="email" type="email" placeholder="seu@email.com" required={!demo} autoComplete="email" />
        </div>
        <div className="field">
          <label>Senha</label>
          <input name="password" type="password" placeholder="••••••••" required={!demo} autoComplete="current-password" />
        </div>
        <button className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Entrando…' : demo ? 'Entrar no protótipo' : 'Entrar'}
        </button>
      </form>
    </>
  )
}
