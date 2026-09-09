# Desperta Members V1.9

Continuação direta da V1.8 da Área de Membros **Desperta Empreendedora**.

## O que esta versão entrega

A tela administrativa **Conteúdos & Acessos** agora é operacional:

- criar conteúdos;
- editar conteúdos existentes;
- organizar módulos;
- cadastrar e editar aulas;
- vincular vídeos e posters;
- cadastrar e editar materiais;
- preservar a regra de vitrine bloqueada para alunas sem matrícula;
- impedir exclusão de um conteúdo que ainda tenha matrículas.

## Banco de dados

A V1.9 não exige nova migration em relação à V1.8. Ela usa as tabelas e campos já existentes no schema atual (`programs`, `modules`, `lessons`, `materials`, `enrollments`).

Para uma instalação nova, execute `supabase/schema.sql` e `supabase/seed.sql` conforme o fluxo já utilizado.

Para quem veio da V1.7 ou anterior, preserve as migrations existentes em `supabase/migrations/`.

## Publicação

Publique esta pasta no mesmo projeto GitHub/Vercel da V1.8, preservando as variáveis de ambiente existentes e o mesmo projeto Supabase.


## V1.10 — Upload pelo painel

Antes de testar os uploads, execute no Supabase SQL Editor o arquivo `supabase/desperta_members_v1_10_STORAGE.sql`. Ele cria os buckets `program-covers` (público) e `program-materials` (privado) e libera upload somente para administradores. Materiais privados são entregues às alunas por URL assinada temporária após a validação da matrícula.
