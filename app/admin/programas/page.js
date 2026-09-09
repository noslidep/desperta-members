import Link from 'next/link'
import { getAllProgramsAdmin } from '../../../lib/data'
import { getContentType } from '../../../lib/content-types'

const STATUS_LABELS={draft:'Rascunho',published:'Publicado',coming_soon:'Em breve',archived:'Arquivado'}

export default async function AdminPrograms({searchParams}) {
  const rows = await getAllProgramsAdmin()
  const qs=await searchParams
  return <div className="page">
    <div className="section-head">
      <div>
        <span className="eyebrow">Gestão de conteúdo</span>
        <h3 style={{ fontSize: 30 }}>Conteúdos & Acessos</h3>
        <p>Cadastre e organize cursos, mentorias, imersões, treinamentos, eventos e comunidades.</p>
      </div>
      <Link prefetch={false} href="/admin/programas/novo" className="btn btn-primary">+ Novo conteúdo</Link>
    </div>
    {qs?.deleted&&<div className="alert alert-success">Conteúdo excluído com sucesso.</div>}
    {qs?.error&&<div className="alert alert-error">{qs.error}</div>}
    <div className="card table-wrap">
      <table className="table">
        <thead><tr><th>Conteúdo</th><th>Tipo</th><th>Status</th><th>Vitrine</th><th>Posição</th><th>Ação</th></tr></thead>
        <tbody>{rows.map(p => {
          const type = getContentType(p.content_type)
          return <tr key={p.id}>
            <td><strong>{p.title}</strong><br /><small>{p.slug}</small></td>
            <td><span className="access-pill access-none">{type.label}</span></td>
            <td>{STATUS_LABELS[p.status]||p.status}</td>
            <td>{p.catalog_visible === false ? 'Oculto' : 'Visível'}</td>
            <td>{p.position ?? 0}</td>
            <td><Link prefetch={false} className="btn btn-secondary btn-small" href={`/admin/programas/${p.id}`}>Editar conteúdo →</Link></td>
          </tr>
        })}</tbody>
      </table>
      {!rows.length&&<div className="empty">Nenhum conteúdo cadastrado.</div>}
    </div>
    <p className="footer-note">V1.9.2: CRUD de conteúdo, módulos, aulas e materiais com validações de edição e exclusão.</p>
  </div>
}
