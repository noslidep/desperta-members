# Desperta Members V1.3

Área de membros independente da Desperta Empreendedora.

## V1.3 — Acessos por aluna
Esta versão adiciona um painel real em **Administração → Alunas & Acessos**:
- convite de alunas;
- gestão individual por programa;
- liberação em massa;
- status ativo/pausado/cancelado/concluído;
- validade opcional por matrícula;
- proteção de URL e conteúdo via Supabase RLS;
- edição de nome e telefone da própria conta.

## Antes de publicar a V1.3
Execute no SQL Editor do Supabase:

`supabase/migrations/20260821_v1_3_access_control.sql`

Execute uma única vez. Depois faça o commit dos arquivos da V1.3 na branch `main`; a Vercel fará o deploy automaticamente.

## Regra de acesso
`active` e `completed` mantêm o acesso enquanto a validade não venceu. `paused`, `cancelled`, ausência de matrícula ou validade vencida bloqueiam o conteúdo.
