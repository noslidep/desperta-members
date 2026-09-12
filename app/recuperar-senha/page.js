import Image from 'next/image'
import Link from 'next/link'
import ResetPasswordRequestForm from '../../components/ResetPasswordRequestForm'

export default function RecuperarSenha(){
 return <main className="login-page">
  <section className="login-art">
   <Image className="logo-login" src="/logo-desperta.png" width={650} height={190} alt="Desperta Empreendedora"/>
   <h1>Vamos recuperar seu acesso.</h1>
   <p>Informe seu e-mail cadastrado. Você receberá um link seguro para criar ou redefinir sua senha.</p>
   <Image className="login-person" src="/vanessa.png" width={800} height={1000} alt="Mentora" priority/>
  </section>
  <section className="login-panel">
   <span className="eyebrow">Acesso</span>
   <h2>Criar ou recuperar senha</h2>
   <p>Use esta opção se você recebeu um convite e ainda não criou uma senha, ou se esqueceu a senha atual.</p>
   <ResetPasswordRequestForm/>
   <Link href="/login" style={{marginTop:20,fontSize:13,color:'#0f477d',fontWeight:750}}>← Voltar para o login</Link>
  </section>
 </main>
}
