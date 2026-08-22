import ProgramCard from '../../../components/ProgramCard'
import { getMyPrograms } from '../../../lib/data'

export default async function Programs() {
  const contents = await getMyPrograms()
  const mine = contents.filter(item => item.enrolled)
  const locked = contents.filter(item => !item.enrolled)

  return (
    <div className="page">
      <div className="section-head">
        <div>
          <span className="eyebrow">Sua área</span>
          <h3 style={{ fontSize: 30 }}>Meus Acessos</h3>
          <p>Entre nos conteúdos liberados para sua conta e acompanhe sua evolução.</p>
        </div>
      </div>

      <section className="section section-first">
        <div className="section-head">
          <div>
            <h3>Seus acessos</h3>
            <p>Cursos, mentorias e experiências que já estão liberados para você.</p>
          </div>
        </div>
        {mine.length ? (
          <div className="grid grid-3">{mine.map(item => <ProgramCard key={item.id} program={item} />)}</div>
        ) : (
          <div className="card empty">Você ainda não possui nenhum conteúdo liberado.</div>
        )}
      </section>

      {locked.length > 0 && (
        <section className="section">
          <div className="section-head">
            <div>
              <h3>Outros conteúdos Desperta</h3>
              <p>Veja as capas de outros conteúdos disponíveis. O cadeado indica que o acesso ainda não está liberado.</p>
            </div>
          </div>
          <div className="grid grid-3">{locked.map(item => <ProgramCard key={item.id} program={item} />)}</div>
        </section>
      )}
    </div>
  )
}
