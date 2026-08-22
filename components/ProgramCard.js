import Link from 'next/link'
import Image from 'next/image'
import ProgressBar from './ProgressBar'
import { getContentType } from '../lib/content-types'

function accessStateLabel(program) {
  if (program.status === 'coming_soon' || program.access_state === 'coming_soon') return 'Em breve'
  if (program.access_state === 'paused') return 'Acesso pausado'
  if (program.access_state === 'expired') return 'Acesso expirado'
  if (program.access_state === 'cancelled') return 'Acesso não disponível'
  return 'Acesso bloqueado'
}

export default function ProgramCard({ program }) {
  const type = getContentType(program.content_type)
  const locked = !program.enrolled

  if (locked) {
    return (
      <article className="card program-card program-card-locked" aria-label={`${program.title} — ${accessStateLabel(program)}`}>
        <div className="program-cover program-cover-locked">
          {program.cover_url ? (
            <Image
              src={program.cover_url}
              fill
              sizes="(max-width:720px) 100vw, 33vw"
              style={{ objectFit: 'cover' }}
              alt={program.title}
            />
          ) : (
            <div className="program-cover-fallback">{program.title}</div>
          )}
          <div className="locked-shade" />
          <span className="content-type-badge">{type.label}</span>
          <span className="lock-badge" aria-hidden="true">🔒</span>
          <div className="locked-cover-copy">
            <strong>{program.title}</strong>
            <span>{accessStateLabel(program)}</span>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="card program-card">
      <div className="program-cover">
        {program.cover_url ? (
          <Image
            src={program.cover_url}
            fill
            sizes="(max-width:720px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
            alt={program.title}
          />
        ) : (
          <div className="program-cover-fallback">{program.title}</div>
        )}
        <span className="content-type-badge">{type.label}</span>
        <span className="status">Ativo</span>
      </div>
      <div className="program-body">
        <h4>{program.title}</h4>
        <p>{program.subtitle || program.description}</p>
        <ProgressBar value={program.progress} />
        <div className="program-progress-meta">
          <span>{program.progress || 0}% concluído</span>
          <span>{program.completed_lessons || 0}/{program.total_lessons || 0} aulas</span>
        </div>
        <Link
          prefetch={false}
          className="btn btn-secondary"
          style={{ marginTop: 14 }}
          href={`/programas/${program.slug}`}
        >
          {program.progress ? type.continueLabel : type.accessLabel} →
        </Link>
      </div>
    </article>
  )
}
