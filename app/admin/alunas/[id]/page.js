import Link from 'next/link'
import {notFound} from 'next/navigation'
import {getStudentAccessAdmin} from '../../../../lib/data'
import {saveStudentAccess,updateStudentProfile,sendStudentPasswordLink,deleteStudent} from '../actions'
import DeleteStudentForm from '../../../../components/DeleteStudentForm'

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
  <div className="section-head"><div><Link prefetch={false} href="/admin/alunas" className="badge">← Voltar para alunas</Link><h3 style={{fontSize:30,marginTop:12}}>{student.full_name||'Aluna'}</h3><p>{student.email} • {activeCount} acesso(s) ativo(s)</p></div></div>
  {qs?.saved&&<div className="alert alert-success">Acessos atualizados com sucesso.</div>}
  {qs?.profile&&<div className="alert alert-success">Dados da aluna alterados com sucesso.</div>}
  {qs?.password&&<div className="alert alert-success">Link para criar ou redefinir a senha enviado para o e-mail da aluna.</div>}
  {qs?.error&&<div className="alert alert-error">{qs.error}</div>}

  <div className="grid grid-2 admin-access-top">
   <form action={updateStudentProfile} className="card form-card">
    <input type="hidden" name="student_id" value={student.id}/>
    <span className="eyebrow">Alterar aluna</span><h3 style={{color:'#071b3e'}}>Dados cadastrais</h3>
    <div className="field"><label>Nome completo</label><input name="full_name" defaultValue={student.full_name||''}/></div>
    <div className="field"><label>E-mail</label><input name="email" type="email" defaultValue={student.email||''} required/><small>Ao alterar, o novo e-mail passa a ser usado no login.</small></div>
    <div className="field"><label>Telefone</label><input name="phone" defaultValue={student.phone||''} placeholder="(00) 00000-0000"/></div>
    <button className="btn btn-secondary">Salvar alterações</button>
   </form>
   <div className="card form-card">
    <span className="eyebrow">Acesso à conta</span><h3 style={{color:'#071b3e'}}>Senha e segurança</h3>
    <p className="muted">Envie um novo link quando a aluna ainda não criou a senha ou quando precisar recuperar o acesso. O link abre a tela da Desperta para ela definir a senha pessoal.</p>
    <form action={sendStudentPasswordLink}>
     <input type="hidden" name="student_id" value={student.id}/>
     <button className="btn btn-primary" type="submit">Enviar link para criar / redefinir senha</button>
    </form>
    <div className="stat access-stat"><strong>{activeCount}</strong><span>conteúdos liberados agora</span></div>
   </div>
  </div>

  <form action={saveStudentAccess} className="section">
   <input type="hidden" name="student_id" value={student.id}/>
   <div className="section-head"><div><h3>Acessos por conteúdo</h3><p>Defina o status e, se desejar, uma data de validade diferente para cada produto.</p></div><button className="btn btn-primary">Salvar todos os acessos</button></div>
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
    {!programs.length&&<div className="card empty">Nenhum conteúdo cadastrado.</div>}
   </div>
   <div className="sticky-save"><span>Alterações só entram em vigor depois de salvar.</span><button className="btn btn-primary">Salvar todos os acessos</button></div>
  </form>

  <section className="section danger-zone">
   <div className="card form-card danger-card">
    <span className="eyebrow danger-eyebrow">Zona de segurança</span>
    <h3 style={{color:'#781f27'}}>Excluir aluna</h3>
    <p className="muted">Use somente quando desejar remover definitivamente a conta. Matrículas e progresso vinculados também serão removidos.</p>
    <DeleteStudentForm action={deleteStudent} studentId={student.id} studentName={student.full_name||student.email}/>
   </div>
  </section>
 </div>
}
