import Link from 'next/link'
import {inviteStudent,bulkUpdateAccess} from './actions'
import {getStudentsAdmin,getAllProgramsAdmin} from '../../../lib/data'

function accessSummary(accesses=[]){
 const current=accesses.filter(a=>['active','completed'].includes(a.status) && (!a.expires_at || new Date(a.expires_at).getTime()>Date.now()))
 if(!current.length)return 'Sem programas ativos'
 return current.map(a=>a.programs?.title).filter(Boolean).join(', ')
}

export default async function Students({searchParams}){
 const q=await searchParams
 const [rows,programs]=await Promise.all([getStudentsAdmin(),getAllProgramsAdmin()])
 return <div className="page">
  <div className="section-head"><div><span className="eyebrow">Acessos</span><h3 style={{fontSize:30}}>Alunas</h3><p>Convide, altere e controle exatamente quais programas cada aluna pode acessar.</p></div></div>
  {q?.invited&&<div className="alert alert-success">Convite enviado. A aluna poderá criar a própria senha pelo link recebido.</div>}
  {q?.deleted&&<div className="alert alert-success">Aluna excluída da plataforma.</div>}
  {q?.bulk&&<div className="alert alert-success">Acessos das alunas selecionadas foram atualizados.</div>}
  {q?.error&&<div className="alert alert-error">{q.error}</div>}

  <div className="grid grid-2 admin-access-top">
   <form action={inviteStudent} className="card form-card">
    <h3 style={{color:'#071b3e'}}>Convidar nova aluna</h3>
    <div className="field"><label>Nome</label><input name="full_name" placeholder="Nome completo"/></div>
    <div className="field"><label>E-mail</label><input name="email" type="email" placeholder="aluna@email.com" required/></div>
    <button className="btn btn-primary">Enviar convite</button>
    <p className="footer-note">A nova aluna nasce sem acesso a cursos. A matrícula é liberada por programa no painel.</p>
   </form>
   <div className="card form-card">
    <span className="eyebrow">Regra central</span><h3 style={{color:'#071b3e'}}>Acesso individual</h3>
    <p className="muted">Uma aluna pode ter um, vários ou nenhum programa. A URL de módulos, aulas, materiais e eventos protegidos também respeita a matrícula ativa e a validade.</p>
    <div className="access-legend"><span className="access-pill access-active">Ativo</span><span className="access-pill access-paused">Pausado</span><span className="access-pill access-cancelled">Cancelado</span><span className="access-pill access-expired">Expirado</span></div>
   </div>
  </div>

  <section className="section">
   <div className="section-head"><div><h3>Gestão de alunas e acessos</h3><p>{rows.length} aluna(s) cadastrada(s). Abra uma aluna para alterar dados, senha, acessos ou excluir a conta.</p></div></div>
   <form action={bulkUpdateAccess} className="card table-wrap">
    <div className="bulk-toolbar">
     <div className="field compact-field"><label>Programa</label><select name="program_id" required defaultValue=""><option value="" disabled>Selecione...</option>{programs.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select></div>
     <div className="field compact-field"><label>Ação em massa</label><select name="bulk_status" defaultValue="active"><option value="active">Liberar / Ativar</option><option value="paused">Pausar</option><option value="cancelled">Cancelar</option><option value="completed">Marcar concluído</option><option value="none">Remover matrícula</option></select></div>
     <div className="field compact-field"><label>Validade (opcional)</label><input name="bulk_expires" type="date"/></div>
     <button className="btn btn-primary bulk-button">Aplicar às selecionadas</button>
    </div>
    <table className="table admin-students-table"><thead><tr><th style={{width:40}}>Sel.</th><th>Aluna</th><th>Programas ativos</th><th>Cadastro</th><th></th></tr></thead><tbody>
     {rows.map(r=><tr key={r.id}>
      <td><input type="checkbox" name="student_ids" value={r.id} aria-label={`Selecionar ${r.full_name||r.email}`}/></td>
      <td><strong>{r.full_name||'Sem nome'}</strong><div className="table-sub">{r.email}</div></td>
      <td><div className="student-access-summary">{accessSummary(r.accesses)}</div></td>
      <td>{r.created_at?new Date(r.created_at).toLocaleDateString('pt-BR'):'—'}</td>
      <td><Link prefetch={false} className="btn btn-secondary btn-small" href={`/admin/alunas/${r.id}`}>Alterar / acessos →</Link></td>
     </tr>)}
     {!rows.length&&<tr><td colSpan="5"><div className="empty">Nenhuma aluna cadastrada ainda.</div></td></tr>}
    </tbody></table>
   </form>
  </section>
 </div>
}
