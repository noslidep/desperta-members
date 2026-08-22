import { getAllProgramsAdmin } from '../../../lib/data'
import { getContentType } from '../../../lib/content-types'

export default async function AdminPrograms() {
  const rows = await getAllProgramsAdmin()
  return <div className="page">
    <div className="section-head">
      <div>
        <span className="eyebrow">Gestão de conteúdo</span>
        <h3 style={{ fontSize: 30 }}>Conteúdos & Acessos</h3>
        <p>Organize cursos, mentorias, imersões, treinamentos, eventos e comunidades.</p>
      </div>
      <button className="btn btn-primary">+ Novo conteúdo</button>
    </div>
    <div className="card table-wrap">
      <table className="table">
        <thead><tr><th>Conteúdo</th><th>Tipo</th><th>Status</th><th>Vitrine</th><th>Aulas</th><th>Ação</th></tr></thead>
        <tbody>{rows.map(p => {
          const type = getContentType(p.content_type)
          return <tr key={p.id}>
            <td><strong>{p.title}</strong><br /><small>{p.slug}</small></td>
            <td><span className="access-pill access-none">{type.label}</span></td>
            <td>{p.status}</td>
            <td>{p.catalog_visible === false ? 'Oculto' : 'Visível'}</td>
            <td>{p.total_lessons || 0}</td>
            <td><button className="btn btn-secondary">Editar</button></td>
          </tr>
        })}</tbody>
      </table>
    </div>
    <p className="footer-note">A V1.8 já diferencia os tipos de conteúdo e a visibilidade na vitrine. O cadastro/edição completo pelo painel será a próxima etapa.</p>
  </div>
}
