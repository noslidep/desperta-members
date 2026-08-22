# Desperta Members V1.8

## O que mudou

- “Meus Programas” passou a se chamar **Meus Acessos**.
- O Admin usa **Conteúdos & Acessos**.
- Cada conteúdo possui um tipo: Curso, Mentoria, Imersão, Treinamento, Evento ou Comunidade.
- Conteúdos sem matrícula aparecem para a aluna **somente como capa bloqueada**, com cadeado.
- Conteúdos bloqueados não exibem descrição, progresso, módulos, aulas, materiais ou URLs internas.
- A proteção real continua no servidor/Supabase: tentar acessar diretamente um curso/aula sem matrícula continua negado.
- Novo campo `catalog_visible`: permite ocultar totalmente um conteúdo da vitrine quando necessário.

## Migration obrigatória

Execute uma única vez no Supabase SQL Editor:

`supabase/migrations/20260821_v1_8_catalog_access.sql`

Depois publique os arquivos da V1.8 no GitHub/Vercel.

## Tipos internos

- `course` → Curso
- `mentoring` → Mentoria
- `immersion` → Imersão
- `training` → Treinamento
- `event` → Evento
- `community` → Comunidade
