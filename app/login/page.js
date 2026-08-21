import Image from 'next/image'
import Link from 'next/link'
import LoginForm from '../../components/LoginForm'
import { isDemo } from '../../lib/supabase/server'

export default async function Login({ searchParams }) {
  const q = await searchParams
  const demo = isDemo()

  return (
    <main className="login-page">
      <section className="login-art">
        <Image className="logo-login" src="/logo-desperta.png" width={650} height={190} alt="Desperta Empreendedora" />
        <h1>Sua jornada continua aqui.</h1>
        <p>Cursos, encontros, materiais e evolução reunidos em uma experiência criada para acompanhar cada etapa do seu crescimento.</p>
        <Image className="login-person" src="/vanessa.png" width={600} height={800} alt="Mentora" priority />
      </section>
      <section className="login-panel">
        <span className="eyebrow">Área de membros</span>
        <h2>Bem-vinda de volta</h2>
        <p>Entre com seus dados de acesso para continuar sua jornada.</p>
        {demo && <div className="alert alert-info"><strong>Modo demonstração ativo.</strong><br />Você pode entrar sem Supabase configurado.</div>}
        <LoginForm demo={demo} initialError={q?.erro || ''} />
        <div style={{ marginTop: 20, fontSize: 12, color: '#66758d' }}>O cadastro público está desativado. Acesso liberado pela equipe ou por compra integrada.</div>
        <Link href="/" style={{ marginTop: 20, fontSize: 12, color: '#0f477d' }}>← Voltar</Link>
      </section>
    </main>
  )
}
