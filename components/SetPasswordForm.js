'use client'

import {useEffect,useState} from 'react'
import {createClient} from '../lib/supabase/client'

export default function SetPasswordForm(){
 const[supabase]=useState(()=>createClient())
 const[checking,setChecking]=useState(true)
 const[ready,setReady]=useState(false)
 const[loading,setLoading]=useState(false)
 const[error,setError]=useState('')
 const[success,setSuccess]=useState('')

 useEffect(()=>{
  let alive=true
  let retry
  async function checkSession(){
   const{data,error:sessionError}=await supabase.auth.getSession()
   if(!alive)return
   if(data?.session){setReady(true);setChecking(false);setError('');return}
   if(sessionError)setError(sessionError.message)
   retry=setTimeout(async()=>{
    const{data:again}=await supabase.auth.getSession()
    if(!alive)return
    setReady(Boolean(again?.session));setChecking(false)
    if(!again?.session)setError('Este link não está mais válido. Solicite um novo link em “Criar ou recuperar senha”.')
   },700)
  }
  const{data:listener}=supabase.auth.onAuthStateChange((_event,session)=>{
   if(session&&alive){setReady(true);setChecking(false);setError('')}
  })
  checkSession()
  return()=>{alive=false;if(retry)clearTimeout(retry);listener?.subscription?.unsubscribe()}
 },[supabase])

 async function handleSubmit(event){
  event.preventDefault()
  setError('');setSuccess('')
  if(!ready){setError('A sessão do link ainda não foi validada. Solicite um novo link se necessário.');return}
  const form=new FormData(event.currentTarget)
  const password=String(form.get('password')||'')
  const confirm=String(form.get('confirm_password')||'')
  if(password.length<8){setError('Crie uma senha com pelo menos 8 caracteres.');return}
  if(password!==confirm){setError('As duas senhas precisam ser iguais.');return}
  setLoading(true)
  try{
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
  {checking&&<div className="alert alert-info">Validando seu link seguro…</div>}
  <form onSubmit={handleSubmit}>
   <div className="field"><label>Crie sua senha</label><input name="password" type="password" minLength={8} autoComplete="new-password" placeholder="Mínimo de 8 caracteres" required disabled={!ready||loading}/></div>
   <div className="field"><label>Confirme sua senha</label><input name="confirm_password" type="password" minLength={8} autoComplete="new-password" placeholder="Digite novamente" required disabled={!ready||loading}/></div>
   <button className="btn btn-primary" style={{width:'100%'}} disabled={loading||!ready}>{checking?'Validando link…':loading?'Salvando…':'Criar minha senha'}</button>
  </form>
 </>
}
