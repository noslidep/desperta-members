'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import AppIcon from './AppIcon'

const items = [
  ['/dashboard', 'home', 'Início'],
  ['/programas', 'play', 'Meus Acessos'],
  ['/agenda', 'calendar', 'Agenda'],
  ['/materiais', 'materials', 'Materiais'],
  ['/certificados', 'award', 'Certificados'],
  ['/suporte', 'support', 'Suporte'],
  ['/minha-conta', 'user', 'Minha Conta']
]

function isActive(pathname, href) {
  if (href === '/dashboard') return pathname === '/dashboard'
  return pathname === href || pathname?.startsWith(`${href}/`)
}

export default function Sidebar({ profile }) {
  const pathname = usePathname()
  const firstName = profile?.full_name || 'Aluna'

  return <>
    <aside className="sidebar sidebar-premium">
      <Link prefetch={false} className="brand" href="/dashboard" aria-label="Ir para o início">
        <Image src="/logo-desperta.png" width={430} height={120} alt="Desperta Empreendedora" priority />
      </Link>

      <div className="member-mini member-mini-premium">
        <div className="avatar">{firstName[0]}</div>
        <div className="member-mini-copy"><strong>{firstName}</strong><small>Minha jornada</small></div>
      </div>

      <nav className="nav nav-premium" aria-label="Navegação principal">
        {items.map(([href, icon, label]) => {
          const active = isActive(pathname, href)
          return <Link prefetch={false} key={href} href={href} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}>
            <span className="ico"><AppIcon name={icon} size={22} /></span>
            <span className="label">{label}</span>
            <span className="nav-arrow" aria-hidden="true">›</span>
          </Link>
        })}
      </nav>

      <div className="sidebar-bottom">
        <Link prefetch={false} className="nav-bottom-link" href="/logout"><span className="ico"><AppIcon name="logout" size={21} /></span><span className="label">Sair</span></Link>
        {profile?.role === 'admin' && <Link prefetch={false} className={`nav-bottom-link ${pathname?.startsWith('/admin') ? 'active' : ''}`} href="/admin"><span className="ico"><AppIcon name="settings" size={21} /></span><span className="label">Administração</span></Link>}
      </div>
    </aside>

    <nav className="mobile-nav mobile-nav-premium" aria-label="Navegação móvel">
      {items.slice(0, 5).map(([href, icon, label]) => {
        const active = isActive(pathname, href)
        return <Link prefetch={false} key={href} href={href} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}><span><AppIcon name={icon} size={21} /></span>{label}</Link>
      })}
    </nav>
  </>
}
