import { getMaterials } from '../../../lib/data'

export default async function Materials() {
  const items = await getMaterials()

  return <div className="page">
    <div className="section-head">
      <div>
        <span className="eyebrow">Biblioteca</span>
        <h3 style={{ fontSize: 30 }}>Materiais</h3>
        <p>Workbooks, checklists e ferramentas dos conteúdos liberados para você.</p>
      </div>
    </div>

    <div className="grid grid-3">
      {items.map(m => <article className="card card-pad" key={m.id}>
        <span className="badge">{m.file_type || 'Arquivo'}</span>
        <h3 style={{ color: '#071b3e' }}>{m.title}</h3>
        <p className="muted">{m.description}</p>
        <small className="muted">{m.program_title}</small>
        <div className="actions">
          <a
            className="btn btn-secondary"
            href={`/api/materials/${m.id}/download`}
            target="_blank"
            rel="noopener noreferrer"
          >Baixar material ↓</a>
        </div>
      </article>)}
    </div>
  </div>
}
