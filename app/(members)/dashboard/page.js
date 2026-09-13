import Image from 'next/image'
import Link from 'next/link'
import ProgramCard from '../../../components/ProgramCard'
import ProgressBar from '../../../components/ProgressBar'
import AppIcon from '../../../components/AppIcon'
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
  const completedLessons = mine.reduce((n, item) => n + (item.completed_lessons || 0), 0)
  const firstName = profile?.full_name?.split(' ')[0] || 'Aluna'

  return <div className="page dashboard-premium">
    <section className="hero hero-premium">
      <div className="hero-copy">
        <span className="eyebrow"><AppIcon name="sparkles" size={14} /> Sua jornada Desperta</span>
        <h2>Olá, {firstName}.</h2>
        <p>Continue de onde parou, acompanhe seus encontros e encontre tudo que precisa para avançar com direção e constância.</p>
        <div className="actions hero-actions">
          {active && <Link prefetch={false} className="btn btn-primary btn-dynamic" href={`/programas/${active.slug}`}><AppIcon name="play" size={18} /> {activeType.continueLabel}<span className="btn-arrow"><AppIcon name="arrow" size={17} /></span></Link>}
          <Link prefetch={false} className="btn btn-ghost btn-dynamic" href="/programas">Ver meus acessos<span className="btn-arrow"><AppIcon name="arrow" size={17} /></span></Link>
        </div>
      </div>
      <div className="hero-person"><Image src="/vanessa.png" width={800} height={1000} alt="Vanessa" priority /></div>
      <div className="hero-glow" aria-hidden="true" />
    </section>

    {active && <section className="section section-featured">
      <div className="section-head"><div><span className="section-kicker">Seu próximo passo</span><h3>Continuar de onde parou</h3><p>Sua próxima ação está aqui.</p></div></div>
      <div className="card continue-card continue-card-premium">
        <div className="continue-cover-wrap">
          <Image src={active.cover_url || '/formula-gestao-vendas.png'} width={1600} height={900} alt={active.title} unoptimized />
          <span className="continue-cover-badge"><AppIcon name="play" size={14} /> Em andamento</span>
        </div>
        <div className="continue-body">
          <span className="eyebrow">{activeType.label} em andamento</span>
          <h4>{active.title}</h4>
          {active.subtitle && <p className="muted">{active.subtitle}</p>}
          <div className="continue-progress-wrap">
            <ProgressBar value={active.progress} />
            <div className="progress-meta"><span><strong>{active.progress}%</strong> concluído</span><span>{active.completed_lessons}/{active.total_lessons} aulas</span></div>
          </div>
          <div className="actions"><Link prefetch={false} className="btn btn-primary btn-dynamic" href={`/programas/${active.slug}`}>{activeType.continueLabel}<span className="btn-arrow"><AppIcon name="arrow" size={17} /></span></Link></div>
        </div>
      </div>
    </section>}

    <section className="section journey-summary-section">
      <div className="section-head compact-section-head"><div><span className="section-kicker">Visão rápida</span><h3>Resumo da sua jornada</h3></div></div>
      <div className="journey-summary-grid">
        <Link prefetch={false} href="/programas" className="journey-stat journey-stat-primary"><span className="journey-stat-icon"><AppIcon name="play" size={24} /></span><div><strong>{mine.length}</strong><span>acessos ativos</span></div><AppIcon name="arrow" size={18} className="journey-stat-arrow" /></Link>
        <div className="journey-stat"><span className="journey-stat-icon"><AppIcon name="check" size={24} /></span><div><strong>{completedLessons}</strong><span>aulas concluídas</span></div></div>
        <Link prefetch={false} href="/agenda" className="journey-stat"><span className="journey-stat-icon"><AppIcon name="calendar" size={24} /></span><div><strong>{events.length}</strong><span>próximos encontros</span></div><AppIcon name="arrow" size={18} className="journey-stat-arrow" /></Link>
      </div>
    </section>

    <section className="section">
      <div className="section-head">
        <div><span className="section-kicker">Sua biblioteca</span><h3>Meus Acessos</h3><p>Conteúdos já liberados para sua conta.</p></div>
        <Link prefetch={false} href="/programas" className="section-link">Ver todos <AppIcon name="arrow" size={16} /></Link>
      </div>
      {mine.length ? <div className="grid grid-3">{mine.slice(0, 3).map(item => <ProgramCard key={item.id} program={item} />)}</div> : <div className="card empty">Nenhum acesso liberado no momento.</div>}
    </section>

    {locked.length > 0 && <section className="section">
      <div className="section-head"><div><span className="section-kicker">Descubra</span><h3>Outros conteúdos Desperta</h3><p>Conheça os conteúdos da sua jornada. O cadeado indica o que ainda não foi liberado.</p></div></div>
      <div className="grid grid-3">{locked.slice(0, 3).map(item => <ProgramCard key={item.id} program={item} />)}</div>
    </section>}

    <section className="section grid grid-2 dashboard-resource-grid">
      <div>
        <div className="section-head"><div><span className="section-kicker">Agenda</span><h3>Próximos encontros</h3><p>Seus próximos compromissos na jornada.</p></div></div>
        <div className="card list resource-card">
          {events.slice(0, 3).map(e => <div className="list-item" key={e.id}><div className="list-icon"><AppIcon name="calendar" size={20} /></div><div className="list-main"><strong>{e.title}</strong><span>{new Date(e.starts_at).toLocaleString('pt-BR', { dateStyle: 'medium', timeStyle: 'short' })} • {e.location_label}</span></div></div>)}
          {!events.length && <div className="empty resource-empty"><AppIcon name="calendar" size={28} /><span>Nenhum encontro agendado.</span></div>}
          <div className="resource-action"><Link prefetch={false} className="btn btn-secondary btn-dynamic" href="/agenda">Ver agenda completa <AppIcon name="arrow" size={16} /></Link></div>
        </div>
      </div>
      <div>
        <div className="section-head"><div><span className="section-kicker">Biblioteca</span><h3>Materiais recentes</h3><p>Workbooks e ferramentas para colocar em prática.</p></div></div>
        <div className="card list resource-card">
          {materials.slice(0, 3).map(m => <div className="list-item" key={m.id}><div className="list-icon"><AppIcon name="file" size={20} /></div><div className="list-main"><strong>{m.title}</strong><span>{m.program_title} • {m.file_type || 'Material'}</span></div></div>)}
          {!materials.length && <div className="empty resource-empty"><AppIcon name="file" size={28} /><span>Nenhum material disponível.</span></div>}
          <div className="resource-action"><Link prefetch={false} className="btn btn-secondary btn-dynamic" href="/materiais">Abrir biblioteca <AppIcon name="arrow" size={16} /></Link></div>
        </div>
      </div>
    </section>

    {ann?.[0] && <section className="section mentor-message card">
      <div className="mentor-message-icon"><AppIcon name="sparkles" size={24} /></div>
      <div><span className="section-kicker">Mensagem da Vanessa</span><h3>{ann[0].title}</h3><p>{ann[0].body}</p></div>
    </section>}
  </div>
}
