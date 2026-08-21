import Link from 'next/link'
import {notFound} from 'next/navigation'
import {getStudentAccessAdmin} from '../../../../lib/data'
import {saveStudentAccess,updateStudentProfile} from '../actions'

function dateValue(value){
 if(!value)return''
 try{return new Date(value).toISOString().slice(0,10)}catch{return''}
}
function statusMeta(status,expires){
 if(['active','completed'].includes(status) && expires && new Date(expires).getTime()<=Date.now())return ['Expirado','access-expired']
 if(status==='active')return ['Ativo','access-active']
 if(status==='paused')return ['Pausado','access-paused']
 if(status==='cancelled')return ['Cancelado','access-cancelled']
 if(status==='completed')return ['Concluído','access-completed']
 return ['Sem acesso','access-none']
}

export default async function StudentAccessPage({params,searchParams}){
 const {id}=await params
 const qs=await searchParams
 const data=await getStudentAccessAdmin(id)
 if(!data)notFound()
 const {student,programs,enrollments}=data
 const byProgram=new Map(enrollments.map(e=>[e.program_id,e]))
 const activeCount=enrollments.filter(e=>['active','completed'].includes(e.status)&&(!e.expires_at||new Date(e.expires_at).getTime()>Date.now())).length
 return <div className="page">
  <div className="section-head"><div><Link prefetch={false} href="/admin/alunas" className="badge">← Voltar para alunas</Link><h3 style={{fontSize:30,marginTop:12}}>{student.full_name||'Aluna'}</h3><p>{student.email} • {activeCount} programa(s) ativo(s)</p></div></div>
  {qs?.saved&&<div className="alert alert-success">Acessos atualizados com sucesso.</div>}

  <div className="grid grid-2 admin-access-top">
   <form action={updateStudentProfile} className="card form-card">
    <input type="hidden" name="student_id" value={student.id}/>
    <span className="eyebrow">Perfil</span><h3 style={{color:'#071b3e'}}>Dados da aluna</h3>
    <div className="field"><label>Nome completo</label><input name="full_name" defaultValue={student.full_name||''}/></div>
    <div className="field"><label>E-mail</label><input value={student.email||''} disabled/></div>
    <div className="field"><label>Telefone</label><input name="phone" defaultValue={student.phone||''} placeholder="(00) 00000-0000"/></div>
    <button className="btn btn-secondary">Salvar dados</button>
   </form>
   <div className="card form-card">
    <span className="eyebrow">Segurança</span><h3 style={{color:'#071b3e'}}>Como o bloqueio funciona</h3>
    <p className="muted">Somente matrículas <strong>Ativas</strong> e dentro da validade liberam curso, módulos, aulas e materiais. Pausar, cancelar, remover ou deixar vencer bloqueia o conteúdo mesmo se a aluna souber a URL direta.</p>
    <div className="stat access-stat"><strong>{activeCount}</strong><span>programas liberados agora</span></div>
   </div>
  </div>

  <form action={saveStudentAccess} className="section">
   <input type="hidden" name="student_id" value={student.id}/>
   <div className="section-head"><div><h3>Acessos por programa</h3><p>Defina o status e, se desejar, uma data de validade diferente para cada produto.</p></div><button className="btn btn-primary">Salvar todos os acessos</button></div>
   <div className="access-program-list">
    {programs.map(program=>{
     const enrollment=byProgram.get(program.id)
     const currentStatus=enrollment?.status||'none'
     const [label,cls]=statusMeta(currentStatus,enrollment?.expires_at)
     return <div className="card access-program-row" key={program.id}>
      <div className="access-program-main"><span className={`access-pill ${cls}`}>{label}</span><strong>{program.title}</strong><span>{program.slug}</span></div>
      <div className="field compact-field"><label>Status</label><select name={`status__${program.id}`} defaultValue={currentStatus}><option value="none">Sem acesso</option><option value="active">Ativo</option><option value="paused">Pausado</option><option value="cancelled">Cancelado</option><option value="completed">Concluído</option></select></div>
      <div className="field compact-field"><label>Validade</label><input type="date" name={`expires__${program.id}`} defaultValue={dateValue(enrollment?.expires_at)}/><small>Vazio = sem vencimento</small></div>
     </div>
    })}
    {!programs.length&&<div className="card empty">Nenhum programa cadastrado.</div>}
   </div>
   <div className="sticky-save"><span>Alterações só entram em vigor depois de salvar.</span><button className="btn btn-primary">Salvar todos os acessos</button></div>
  </form>
 </div>
}
