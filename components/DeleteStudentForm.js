'use client'

export default function DeleteStudentForm({action,studentId,studentName}){
 function confirmDelete(event){
  const ok=window.confirm(`Excluir permanentemente ${studentName||'esta aluna'}?\n\nA conta, matrículas e progresso vinculados serão removidos. Esta ação não pode ser desfeita.`)
  if(!ok)event.preventDefault()
 }
 return <form action={action} onSubmit={confirmDelete}>
  <input type="hidden" name="student_id" value={studentId}/>
  <button className="btn btn-danger" type="submit">Excluir aluna permanentemente</button>
 </form>
}
