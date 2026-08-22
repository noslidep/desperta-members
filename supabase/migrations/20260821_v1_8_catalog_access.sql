-- DESPERTA MEMBERS V1.8 — Meus Acessos + vitrine de conteúdos bloqueados
-- Execute uma única vez no SQL Editor do Supabase.

alter table public.programs
  add column if not exists content_type text not null default 'course',
  add column if not exists catalog_visible boolean not null default true;

alter table public.programs
  drop constraint if exists programs_content_type_check;

alter table public.programs
  add constraint programs_content_type_check
  check (content_type in ('course','mentoring','immersion','training','event','community'));

-- Conteúdo já existente: Fórmula Gestão & Vendas é um curso.
update public.programs
set content_type = 'course'
where slug = 'formula-gestao-vendas';

-- Se a Mentoria CAD já estiver cadastrada, classifica corretamente.
update public.programs
set content_type = 'mentoring'
where slug in ('cad','mentoria-cad')
   or lower(title) in ('cad','mentoria cad');

-- A aluna pode ver metadados/capas dos conteúdos publicados da vitrine,
-- mas módulos, aulas, materiais e URLs continuam protegidos pelas políticas de matrícula.
drop policy if exists "enrolled programs read" on public.programs;
drop policy if exists "catalog programs read" on public.programs;

create policy "catalog programs read"
on public.programs for select to authenticated
using (
  public.is_admin()
  or (
    status in ('published','coming_soon')
    and (
      catalog_visible = true
      or public.has_active_program_access(id)
    )
  )
);
