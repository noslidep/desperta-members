'use client'

import {useEffect,useRef,useState} from 'react'
import {createClient} from '../lib/supabase/client'

function cleanActivationUrl(){
 try{window.history.replaceState({},document.title,'/definir-senha')}catch{}
}

export default function SetPasswordForm(){
 const[supabase]=useState(()=>createClient())
 const[checking,setChecking]=useState(true)
 const[ready,setReady]=useState(false)
 const[loading,setLoading]=useState(false)
 const[error,setError]=useState('')
 const[success,setSuccess]=useState('')
 const started=useRef(false)

 useEffect(()=>{
  let alive=true
  if(started.current)return
  started.current=true

  function fail(message){
   if(!alive)return
   setReady(false);setChecking(false);setError(message||'Este link não pôde ser validado. Solicite um novo link.')
  }
  function ok(){
   if(!alive)return
   setReady(true);setChecking(false);setError('');cleanActivationUrl()
  }

  const{data:listener}=supabase.auth.onAuthStateChange((event,session)=>{
   if(!alive)return
   if(session && ['SIGNED_IN','PASSWORD_RECOVERY','INITIAL_SESSION','TOKEN_REFRESHED','USER_UPDATED'].includes(event))ok()
  })

  async function establishSession(){
   try{
    const url=new URL(window.location.href)
    const query=url.searchParams
    const hash=new URLSearchParams((window.location.hash||'').replace(/^#/,''))
    const providerError=query.get('error_description')||hash.get('error_description')
    if(providerError){fail(decodeURIComponent(providerError.replace(/\+/g,' ')));return}

    // SSR/PKCE: Supabase redirects back with ?code=...
    const code=query.get('code')
    if(code){
     const flowId=query.get('sb_flow_id')
     const{data,error}=await supabase.auth.exchangeCodeForSession(code,flowId?{flowId}:undefined)
     if(error){fail('Este link expirou, já foi utilizado ou não pôde ser validado. Solicite um novo link para criar sua senha.');return}
     if(data?.session){ok();return}
    }

    // Custom/SSR templates may return token_hash + type.
    const tokenHash=query.get('token_hash')
    const type=query.get('type')
    if(tokenHash&&type){
     const{data,error}=await supabase.auth.verifyOtp({token_hash:tokenHash,type})
     if(error){fail('Este link expirou, já foi utilizado ou não pôde ser validado. Solicite um novo link para criar sua senha.');return}
     if(data?.session){ok();return}
    }

    // Admin invite/recovery links may use the implicit flow and return tokens in #fragment.
    const accessToken=hash.get('access_token')
    const refreshToken=hash.get('refresh_token')
    if(accessToken&&refreshToken){
     const{data,error}=await supabase.auth.setSession({access_token:accessToken,refresh_token:refreshToken})
     if(error){fail('Este link expirou ou já foi utilizado. Solicite um novo link para criar sua senha.');return}
     if(data?.session){ok();return}
    }

    // If the Supabase client already processed the URL, reuse the resulting session.
    const{data,error:sessionError}=await supabase.auth.getSession()
    if(sessionError){fail(sessionError.message);return}
    if(data?.session){ok();return}

    fail('Este link não está mais válido. Solicite um novo link em “Criar ou recuperar senha”.')
   }catch(err){
    fail(err?.message||'Não foi possível validar este link. Solicite um novo link.')
   }
  }

  establishSession()
  return()=>{alive=false;listener?.subscription?.unsubscribe()}
 },[supabase])

 async function handleSubmit(event){
  event.preventDefault()
  setError('');setSuccess('')
  if(!ready){setError('O link ainda não foi validado. Solicite um novo link se necessário.');return}
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
