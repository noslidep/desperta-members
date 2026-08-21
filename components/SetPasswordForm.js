'use client'

import {useState} from 'react'
import {createClient} from '../lib/supabase/client'

export default function SetPasswordForm(){
 const[loading,setLoading]=useState(false)
 const[error,setError]=useState('')
 const[success,setSuccess]=useState('')

 async function handleSubmit(event){
  event.preventDefault()
  setError('');setSuccess('')
  const form=new FormData(event.currentTarget)
  const password=String(form.get('password')||'')
  const confirm=String(form.get('confirm_password')||'')
  if(password.length<8){setError('Crie uma senha com pelo menos 8 caracteres.');return}
  if(password!==confirm){setError('As duas senhas precisam ser iguais.');return}
  setLoading(true)
  try{
   const supabase=createClient()
   const{data:{session}}=await supabase.auth.getSession()
   if(!session){
    setError('Este link não possui mais uma sessão válida. Solicite um novo link em “Criar ou recuperar senha”.')
    return
   }
   const{error:updateError}=await supabase.auth.updateUser({password})
   if(updateError){setError(updateError.message);return}
   setSuccess('Senha criada com sucesso. Entrando na sua área…')
   setTimeout(()=>window.location.replace('/dashboard'),700)
  }catch(err){setError(err?.message||'Não foi possível criar sua senha agora.')}
  finally{setLoading(false)}
 }

 return <>
  {error&&<div className="alert alert-error">{error}</div>}
  {success&&<div className="alert alert-success">{success}</div>}
  <form onSubmit={handleSubmit}>
   <div className="field"><label>Crie sua senha</label><input name="password" type="password" minLength={8} autoComplete="new-password" placeholder="Mínimo de 8 caracteres" required/></div>
   <div className="field"><label>Confirme sua senha</label><input name="confirm_password" type="password" minLength={8} autoComplete="new-password" placeholder="Digite novamente" required/></div>
   <button className="btn btn-primary" style={{width:'100%'}} disabled={loading}>{loading?'Salvando…':'Criar minha senha'}</button>
  </form>
 </>
}
