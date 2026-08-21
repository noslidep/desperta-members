# Status — V1.5

- Domínio/Vercel/Supabase: mantidos.
- Sessão SSR: mantida da V1.2.
- Controle individual de acesso: mantido da V1.3.
- Ativação/recuperação de senha: corrigida e reforçada.
- Alteração de aluna: nome, e-mail e telefone.
- Exclusão de aluna: disponível no detalhe da aluna, com confirmação.
- Reenvio de link de senha: disponível no detalhe da aluna.

## V1.7
- Adicionado `/auth/confirm` com verificação SSR por `token_hash`.
- Recuperação/ativação passa a funcionar sem depender do navegador que iniciou o fluxo PKCE.
- Compatível com templates de Recovery (`type=recovery`) e Invite (`type=invite`).
