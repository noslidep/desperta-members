'use client'

import {useState} from 'react'
import {createClient} from '../lib/supabase/client'

function safeName(name){
 return String(name||'arquivo')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g,'')
  .replace(/[^a-zA-Z0-9._-]+/g,'-')
  .replace(/^-+|-+$/g,'')
  .slice(0,120)||'arquivo'
}

export default function AdminFileUpload({bucket,targetInputId,accept,label='Selecionar arquivo',pathPrefix='uploads',maxMb=20}){
 const [state,setState]=useState({busy:false,message:'',error:''})
 async function onChange(event){
  const file=event.target.files?.[0]
  if(!file)return
  if(file.size>maxMb*1024*1024){
   setState({busy:false,message:'',error:`Arquivo acima de ${maxMb} MB.`})
   event.target.value=''
   return
  }
  setState({busy:true,message:'Enviando...',error:''})
  try{
   const supabase=createClient()
   const path=`${pathPrefix}/${crypto.randomUUID()}-${safeName(file.name)}`
   const {error}=await supabase.storage.from(bucket).upload(path,file,{upsert:false,cacheControl:'3600',contentType:file.type||undefined})
   if(error)throw error
   const value=`storage://${bucket}/${path}`
   const input=document.getElementById(targetInputId)
   if(!input)throw new Error('Campo de destino do upload não encontrado.')
   input.value=value
   input.dispatchEvent(new Event('input',{bubbles:true}))
   input.dispatchEvent(new Event('change',{bubbles:true}))
   setState({busy:false,message:`Arquivo enviado: ${file.name}. Clique em salvar para gravar o vínculo.`,error:''})
  }catch(error){
   setState({busy:false,message:'',error:error?.message||'Falha no upload.'})
  }finally{
   event.target.value=''
  }
 }
 return <div className="admin-upload">
  <label className={`btn btn-secondary btn-small ${state.busy?'is-disabled':''}`}>
   {state.busy?'Enviando...':label}
   <input type="file" accept={accept} onChange={onChange} disabled={state.busy} hidden/>
  </label>
  {state.message&&<small className="upload-success">{state.message}</small>}
  {state.error&&<small className="upload-error">{state.error}</small>}
 </div>
}
