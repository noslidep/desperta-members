import Image from 'next/image'
import SetPasswordForm from '../../components/SetPasswordForm'

// Esta página precisa ser pública: links de convite/recuperação podem chegar com a sessão
// no hash da URL, que só o navegador consegue concluir antes de definir a senha.
export default function DefinirSenha(){
 return <main className="login-page">
  <section className="login-art">
   <Image className="logo-login" src="/logo-desperta.png" width={650} height={190} alt="Desperta Empreendedora"/>
   <h1>Seu acesso começa aqui.</h1>
   <p>Crie sua senha pessoal para acessar os conteúdos, aulas e materiais liberados para a sua jornada.</p>
   <Image className="login-person" src="/vanessa.png" width={800} height={1000} alt="Mentora" priority/>
  </section>
  <section className="login-panel">
   <span className="eyebrow">Ativação de acesso</span>
   <h2>Crie sua senha</h2>
   <p>Esta senha será usada nos próximos acessos à Área de Membros Desperta.</p>
   <SetPasswordForm/>
  </section>
 </main>
}
