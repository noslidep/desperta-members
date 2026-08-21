# Área de Membros Desperta — V1

Base independente da plataforma anterior. O projeto usa **Next.js 16 + Supabase** e mantém a identidade visual azul-marinho, dourado e branco aprovada no protótipo.

## O que já existe nesta V1

- Login próprio (sem cadastro público)
- Sessão por cookies / SSR
- Dashboard da aluna
- Meus Programas
- Programa → módulos → aulas
- Player/iframe para vídeo externo
- Progresso e marcação de aula concluída
- Agenda
- Biblioteca de materiais
- Certificados
- Suporte
- Minha Conta
- Área administrativa inicial
- Convite de novas alunas por e-mail
- Banco de dados completo com RLS
- Modo demonstração sem Supabase

## Testar imediatamente

1. Instale Node.js 20.9+.
2. Copie `.env.example` para `.env.local`.
3. Deixe `NEXT_PUBLIC_DEMO_MODE=true`.
4. Rode:

```bash
npm install
npm run dev
```

5. Abra `http://localhost:3000`.

## Ativar dados reais / Supabase

1. Crie um projeto Supabase.
2. No SQL Editor, execute `supabase/schema.sql`.
3. Opcional: execute `supabase/seed.sql` para criar o conteúdo inicial.
4. Preencha `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_APP_URL=https://SEU-DOMINIO.com.br
```

5. Em Supabase Auth, configure o Site URL e Redirect URLs para o domínio final e `/auth/callback`.
6. Crie o primeiro usuário. Depois execute no SQL Editor, trocando o e-mail:

```sql
update public.profiles set role='admin' where email='seu-email@dominio.com';
```

## Vídeo

A plataforma não depende da TechFlix. Cada aula possui `video_provider` e `video_url`. Recomendação: usar um serviço de streaming privado e inserir a URL segura/embed da aula. O vídeo não precisa ficar hospedado no servidor Next.js.

## Segurança

- `SUPABASE_SERVICE_ROLE_KEY` é somente servidor.
- As tabelas expostas usam Row Level Security (RLS).
- Alunas só veem dados próprios e conteúdos aos quais têm matrícula.
- Admin é verificado no servidor e no banco.
- Não existe cadastro público nesta V1.

## Próximas etapas

1. CRUD real do admin para programas, módulos, aulas, materiais e agenda.
2. Integração com checkout para matrícula automática.
3. Player com tracking de tempo e retomada automática.
4. Certificado PDF automático com código de validação.
5. Importador de alunas/conteúdo da plataforma atual.
6. E-mails transacionais e notificações.
7. Deploy de homologação em subdomínio separado antes da migração definitiva.


## V1.2 — sessão SSR

- Proxy alinhado ao padrão atual do Supabase SSR, incluindo headers de sessão/cache.
- Navegação pós-login com reload completo.
- Prefetch desativado nas rotas autenticadas.
- Áreas autenticadas forçadas como dinâmicas.
