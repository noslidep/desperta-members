import Image from 'next/image'
import SetPasswordForm from '../../components/SetPasswordForm'
import {createClient} from '../../lib/supabase/server'
import {redirect} from 'next/navigation'

export default async function DefinirSenha(){
 const supabase=await createClient()
 const{data:{user}}=await supabase.auth.getUser()
 if(!user)redirect('/login?erro='+encodeURIComponent('O link de ativação expirou. Solicite um novo link para criar sua senha.'))
 return <main className="login-page">
  <section className="login-art">
   <Image className="logo-login" src="/logo-desperta.png" width={650} height={190} alt="Desperta Empreendedora"/>
   <h1>Seu acesso começa aqui.</h1>
   <p>Crie sua senha pessoal para acessar os programas, aulas e materiais liberados para a sua jornada.</p>
   <Image className="login-person" src="/vanessa.png" width={600} height={800} alt="Mentora" priority/>
  </section>
  <section className="login-panel">
   <span className="eyebrow">Ativação de acesso</span>
   <h2>Crie sua senha</h2>
   <p>Esta senha será usada nos próximos acessos à Área de Membros Desperta.</p>
   <SetPasswordForm/>
  </section>
 </main>
}
