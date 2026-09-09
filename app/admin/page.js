import Link from 'next/link'
import {getAdminStats} from '../../lib/data'

export default async function Admin(){
  const s=await getAdminStats()
  return <div className="page">
    <div className="section-head">
      <div>
        <span className="eyebrow">Administração</span>
        <h3 style={{fontSize:30}}>Painel Desperta</h3>
        <p>Controle da plataforma independente, dos conteúdos e dos acessos das alunas.</p>
      </div>
    </div>

    <div className="grid grid-4">
      <div className="card stat"><strong>{s.students}</strong><span>alunas</span></div>
      <div className="card stat"><strong>{s.programs}</strong><span>conteúdos</span></div>
      <div className="card stat"><strong>{s.enrollments}</strong><span>acessos ativos e vigentes</span></div>
      <div className="card stat"><strong>{s.completion}%</strong><span>conclusão média</span></div>
    </div>

    <section className="section grid grid-2">
      <div className="card card-pad">
        <span className="eyebrow">V1.9 — Operacional</span>
        <h3 style={{color:'#071b3e'}}>Conteúdos, módulos e aulas</h3>
        <p className="muted">Cadastre e edite cursos, mentorias, imersões e outros conteúdos. Organize módulos, aulas, vídeos, materiais e a visibilidade da vitrine diretamente pelo painel.</p>
        <div className="actions"><Link prefetch={false} href="/admin/programas" className="btn btn-primary">Gerenciar conteúdos →</Link></div>
      </div>

      <div className="card card-pad">
        <span className="eyebrow">Operacional</span>
        <h3 style={{color:'#071b3e'}}>Alunas e acessos</h3>
        <p className="muted">Libere conteúdos individualmente, pause ou cancele acessos e defina validade por conteúdo. O bloqueio também vale para URLs diretas de aulas e materiais.</p>
        <div className="actions"><Link prefetch={false} href="/admin/alunas" className="btn btn-secondary">Gerenciar alunas e acessos →</Link></div>
      </div>
    </section>

    <section className="section">
      <div className="card card-pad">
        <h3 style={{color:'#071b3e'}}>Próximas etapas</h3>
        <div className="list">
          <div className="list-item"><div className="list-main"><strong>Uploads pelo painel</strong><span>Capas, PDFs e materiais enviados diretamente para o Supabase Storage, sem colar URLs manualmente.</span></div></div>
          <div className="list-item"><div className="list-main"><strong>Relatórios</strong><span>Progresso, conclusão e engajamento por aluna.</span></div></div>
          <div className="list-item"><div className="list-main"><strong>Automação de matrícula</strong><span>Compra aprovada libera o produto automaticamente.</span></div></div>
        </div>
      </div>
    </section>
  </div>
}
