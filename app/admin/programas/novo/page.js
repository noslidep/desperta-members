import Link from 'next/link'
import {createProgram} from '../actions'
import AdminFileUpload from '../../../../components/AdminFileUpload'

export default function NewProgramPage(){
 return <div className="page">
  <div className="section-head"><div><Link prefetch={false} href="/admin/programas" className="badge">← Voltar para conteúdos</Link><h3 style={{fontSize:30,marginTop:12}}>Novo conteúdo</h3><p>Crie primeiro a estrutura principal. Depois você poderá adicionar módulos, aulas e materiais.</p></div></div>
  <form action={createProgram} className="card form-card admin-editor-form">
   <div className="grid grid-2">
    <div className="field"><label>Título *</label><input name="title" required placeholder="Ex.: Fórmula Gestão & Vendas"/></div>
    <div className="field"><label>Slug</label><input name="slug" placeholder="formula-gestao-vendas"/><small>Se ficar vazio, será gerado a partir do título.</small></div>
    <div className="field"><label>Tipo</label><select name="content_type" defaultValue="course"><option value="course">Curso</option><option value="mentoring">Mentoria</option><option value="immersion">Imersão</option><option value="training">Treinamento</option><option value="event">Evento</option><option value="community">Comunidade</option></select></div>
    <div className="field"><label>Status</label><select name="status" defaultValue="draft"><option value="draft">Rascunho</option><option value="published">Publicado</option><option value="coming_soon">Em breve</option><option value="archived">Arquivado</option></select></div>
    <div className="field"><label>Posição</label><input name="position" type="number" defaultValue="0"/></div>
    <div className="field checkbox-field"><label><input name="catalog_visible" type="checkbox" defaultChecked/> Exibir capa na vitrine</label><small>Sem matrícula, a capa aparece bloqueada. Desmarque para ocultar totalmente.</small></div>
   </div>
   <div className="field"><label>Subtítulo</label><input name="subtitle"/></div>
   <div className="field"><label>Descrição</label><textarea name="description" rows="5"/></div>
   <div className="field"><label>Capa do conteúdo</label><input id="new-program-cover-url" name="cover_url" placeholder="Envie uma imagem ou cole uma URL"/><AdminFileUpload bucket="program-covers" targetInputId="new-program-cover-url" accept="image/png,image/jpeg,image/webp" label="Enviar capa" pathPrefix="programs/new" maxMb={5}/><small>Recomendado: 1600 × 900 px (16:9), PNG, JPG ou WebP, até 5 MB. Mantenha textos e logos dentro da área central segura.</small></div>
   <div className="actions"><button className="btn btn-primary">Criar conteúdo</button><Link className="btn btn-secondary" href="/admin/programas">Cancelar</Link></div>
  </form>
 </div>
}
