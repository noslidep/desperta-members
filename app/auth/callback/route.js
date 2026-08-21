import {NextResponse} from 'next/server'
import {createClient} from '../../../lib/supabase/server'

export async function GET(request){
 const{searchParams,origin}=new URL(request.url)
 const code=searchParams.get('code')
 const requestedNext=searchParams.get('next')||'/definir-senha'
 const next=requestedNext.startsWith('/')?requestedNext:'/definir-senha'
 if(code){
  const s=await createClient()
  const{error}=await s.auth.exchangeCodeForSession(code)
  if(error)return NextResponse.redirect(`${origin}/definir-senha?erro=${encodeURIComponent('O link não pôde ser validado. Solicite um novo link.')}`)
 }
 // Para links antigos com tokens no #fragment, o navegador preserva o fragmento ao seguir
 // o redirect e a página /definir-senha conclui a sessão no cliente.
 return NextResponse.redirect(`${origin}${next}`)
}
