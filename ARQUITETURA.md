# Arquitetura — Desperta Members

## Independência
A TechFlix não faz parte desta aplicação. Durante a transição, a plataforma antiga pode continuar online, mas a nova área possui autenticação, dados, interface e administração próprios.

## Camadas
- **Next.js 16**: interface + Server Components + Server Actions + rotas.
- **Supabase Auth**: contas, login, recuperação e convites.
- **Postgres/Supabase**: cursos, aulas, matrículas, progresso, agenda e certificados.
- **RLS**: autorização no banco por usuário e perfil admin.
- **Streaming externo**: vídeos por URL/embed privado.

## Entidades
profiles → pessoas e papéis
programs → produtos/programas educacionais
modules → módulos
lessons → aulas
enrollments → liberação de acesso
lesson_progress → progresso individual
materials → PDFs e arquivos
events → agenda
certificates → certificados
announcements → comunicados

## Fluxo da aluna
Login → Dashboard → Meus Programas → Programa → Aula → Progresso → Certificado

## Fluxo administrativo
Admin → Alunas → Programas → Módulos → Aulas → Materiais → Agenda → Relatórios
