import Image from 'next/image'
import Link from 'next/link'
import ProgramCard from '../../../components/ProgramCard'
import ProgressBar from '../../../components/ProgressBar'
import { getCurrentProfile, getMyPrograms, getEvents, getMaterials, getAnnouncements } from '../../../lib/data'
import { getContentType } from '../../../lib/content-types'

export default async function Dashboard() {
  const [profile, contents, events, materials, ann] = await Promise.all([
    getCurrentProfile(), getMyPrograms(), getEvents(), getMaterials(), getAnnouncements()
  ])
  const mine = contents.filter(item => item.enrolled)
  const locked = contents.filter(item => !item.enrolled)
  const active = mine.find(item => item.progress > 0 && item.progress < 100) || mine[0]
  const activeType = active ? getContentType(active.content_type) : null

  return <div className="page">
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">Sua jornada Desperta</span>
        <h2>Olá, {profile?.full_name?.split(' ')[0] || 'Aluna'}.</h2>
        <p>Continue de onde parou, acompanhe seus encontros e encontre tudo que precisa para avançar com direção e constância.</p>
        <div className="actions">
          {active && <Link prefetch={false} className="btn btn-primary" href={`/programas/${active.slug}`}>▶ {activeType.continueLabel}</Link>}
          <Link prefetch={false} className="btn btn-ghost" href="/programas">Ver meus acessos</Link>
        </div>
      </div>
      <div className="hero-person"><Image src="/vanessa.png" width={560} height={760} alt="Vanessa" priority /></div>
    </section>

    {active && <section className="section">
      <div className="section-head"><div><h3>Continuar de onde parou</h3><p>Sua próxima ação está aqui.</p></div></div>
      <div className="card continue-card">
        <Image src={active.cover_url || '/formula-gestao-vendas.png'} width={500} height={400} alt={active.title} />
        <div className="continue-body">
          <span className="eyebrow">{activeType.label} em andamento</span>
          <h4>{active.title}</h4>
          <p className="muted">{active.subtitle}</p>
          <ProgressBar value={active.progress} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7, fontSize: 12, color: '#66758d' }}>
            <span>{active.progress}% concluído</span><span>{active.completed_lessons}/{active.total_lessons} aulas</span>
          </div>
          <div className="actions"><Link prefetch={false} className="btn btn-primary" href={`/programas/${active.slug}`}>{activeType.continueLabel} →</Link></div>
        </div>
      </div>
    </section>}

    <section className="section">
      <div className="section-head">
        <div><h3>Meus Acessos</h3><p>Conteúdos já liberados para sua conta.</p></div>
        <Link prefetch={false} href="/programas" className="badge">Ver todos →</Link>
      </div>
      {mine.length ? <div className="grid grid-3">{mine.slice(0, 3).map(item => <ProgramCard key={item.id} program={item} />)}</div> : <div className="card empty">Nenhum acesso liberado no momento.</div>}
    </section>

    {locked.length > 0 && <section className="section">
      <div className="section-head"><div><h3>Outros conteúdos Desperta</h3><p>As capas ficam visíveis; o cadeado indica conteúdos ainda não liberados.</p></div></div>
      <div className="grid grid-3">{locked.slice(0, 3).map(item => <ProgramCard key={item.id} program={item} />)}</div>
    </section>}

    <section className="section grid grid-3">
      <div className="card stat"><strong>{mine.length}</strong><span>acessos ativos</span></div>
      <div className="card stat"><strong>{mine.reduce((n, item) => n + (item.completed_lessons || 0), 0)}</strong><span>aulas concluídas</span></div>
      <div className="card stat"><strong>{events.length}</strong><span>próximos encontros</span></div>
    </section>

    <section className="section grid grid-2">
      <div>
        <div className="section-head"><div><h3>Próximos encontros</h3><p>Agenda da sua jornada.</p></div></div>
        <div className="card list">
          {events.slice(0, 3).map(e => <div className="list-item" key={e.id}><div className="list-icon">◷</div><div className="list-main"><strong>{e.title}</strong><span>{new Date(e.starts_at).toLocaleString('pt-BR', { dateStyle: 'medium', timeStyle: 'short' })} • {e.location_label}</span></div></div>)}
          {!events.length && <div className="empty">Nenhum encontro agendado.</div>}
          <div style={{ padding: 14 }}><Link prefetch={false} className="btn btn-secondary" href="/agenda">Ver agenda completa</Link></div>
        </div>
      </div>
      <div>
        <div className="section-head"><div><h3>Materiais recentes</h3><p>Workbooks e ferramentas para aplicar.</p></div></div>
        <div className="card list">
          {materials.slice(0, 3).map(m => <div className="list-item" key={m.id}><div className="list-icon">▣</div><div className="list-main"><strong>{m.title}</strong><span>{m.program_title} • {m.file_type || 'Material'}</span></div></div>)}
          <div style={{ padding: 14 }}><Link prefetch={false} className="btn btn-secondary" href="/materiais">Abrir biblioteca</Link></div>
        </div>
      </div>
    </section>

    {ann?.[0] && <section className="section card card-pad"><span className="eyebrow">Comunicado</span><h3 style={{ color: '#071b3e' }}>{ann[0].title}</h3><p className="muted">{ann[0].body}</p></section>}
  </div>
}
