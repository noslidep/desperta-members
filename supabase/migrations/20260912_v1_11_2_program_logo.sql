-- DESPERTA MEMBERS V1.11.2
-- Logo/miniatura específica para o topo/lateral da página do curso.
-- A capa 16:9 permanece em cover_url e continua sendo usada nos cards.

alter table public.programs
  add column if not exists logo_url text;

update public.programs
set logo_url = '/metodo-vida-logo.png',
    updated_at = now()
where slug = 'metodo-vida-em-7-dias';
