'use client'

import {useState} from 'react'
import {createClient} from '../lib/supabase/client'

export default function ResetPasswordRequestForm(){
 const[loading,setLoading]=useState(false)
 const[message,setMessage]=useState('')
 const[error,setError]=useState('')
 async function handleSubmit(event){
  event.preventDefault();setMessage('');setError('')
  const form=new FormData(event.currentTarget)
  const email=String(form.get('email')||'').trim().toLowerCase()
  if(!email)return
  setLoading(true)
  try{
   const supabase=createClient()
   const redirectTo=`${window.location.origin}/auth/callback`
   const{error:resetError}=await supabase.auth.resetPasswordForEmail(email,{redirectTo})
   if(resetError){setError(resetError.message);return}
   setMessage('Se este e-mail estiver cadastrado, você receberá um link para criar uma nova senha. Verifique também a caixa de spam.')
  }catch(err){setError(err?.message||'Não foi possível enviar o link agora.')}
  finally{setLoading(false)}
 }
 return <>
  {error&&<div className="alert alert-error">{error}</div>}
  {message&&<div className="alert alert-success">{message}</div>}
  <form onSubmit={handleSubmit}>
   <div className="field"><label>E-mail cadastrado</label><input name="email" type="email" autoComplete="email" placeholder="seu@email.com" required/></div>
   <button className="btn btn-primary" style={{width:'100%'}} disabled={loading}>{loading?'Enviando…':'Enviar link para criar senha'}</button>
  </form>
 </>
}
