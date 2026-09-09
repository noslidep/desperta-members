# Status — V1.9

## Base preservada da V1.8
- Domínio/Vercel/Supabase mantidos.
- Sessão SSR mantida.
- Controle individual de acesso mantido.
- Ativação/recuperação de senha mantida.
- Alteração e exclusão de aluna mantidas.
- Reenvio de link de senha mantido.
- Conteúdos sem matrícula continuam aparecendo somente como capa bloqueada quando `catalog_visible=true`.
- Proteção real de módulos, aulas e materiais continua no servidor/Supabase.

## V1.9 — nova etapa concluída
- Botão **+ Novo conteúdo** agora funciona.
- Botão **Editar conteúdo** agora abre o editor real.
- Cadastro e edição de: título, slug, tipo, status, posição, vitrine, subtítulo, descrição e capa.
- Gestão de módulos: criar, editar, ordenar, publicar/rascunho e excluir módulo vazio.
- Gestão de aulas: criar, editar, mover de módulo, ordenar, publicar/rascunho, duração, liberação programada, vídeo e poster.
- Gestão de materiais: criar, editar, vincular a módulo/aula e excluir.
- Exclusão de conteúdo bloqueada enquanto houver matrículas, protegendo acessos e progresso.

## Próxima etapa sugerida
- Upload de capas e materiais para Supabase Storage pelo próprio painel, eliminando a necessidade de colar URLs manualmente.

## V1.9.1 — ajuste de retomada
- Painel administrativo atualizado para marcar **Conteúdos, módulos e aulas** como operacional.
- Atalho direto para **Gerenciar conteúdos** na visão geral.
- Próxima etapa passa a ser **Uploads pelo painel**, seguida de Relatórios e Automação de matrícula.
