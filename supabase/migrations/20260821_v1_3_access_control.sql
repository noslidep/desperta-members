-- DESPERTA MEMBERS V1.3 — Controle de acesso por aluna
-- Execute uma única vez no SQL Editor do Supabase do projeto Membros Desperta.

create or replace function public.has_active_program_access(p_program_id uuid)
returns boolean
language sql
stable
security definer
set search_path=public
as $$
  select exists(
    select 1
    from public.enrollments e
    where e.user_id = auth.uid()
      and e.program_id = p_program_id
      and e.status in ('active','completed')
      and (e.expires_at is null or e.expires_at > now())
  );
$$;

grant execute on function public.has_active_program_access(uuid) to authenticated;

-- Programas: a aluna só enxerga programas aos quais possui acesso ativo e vigente.
drop policy if exists "authenticated programs read" on public.programs;
drop policy if exists "enrolled programs read" on public.programs;
create policy "enrolled programs read"
on public.programs for select to authenticated
using (public.is_admin() or public.has_active_program_access(id));

-- Módulos e aulas: acesso exige matrícula ativa e não expirada.
drop policy if exists "enrolled modules read" on public.modules;
create policy "enrolled modules read"
on public.modules for select to authenticated
using (public.is_admin() or (status='published' and public.has_active_program_access(program_id)));

drop policy if exists "enrolled lessons read" on public.lessons;
create policy "enrolled lessons read"
on public.lessons for select to authenticated
using (
  public.is_admin()
  or (
    status='published'
    and (release_at is null or release_at <= now())
    and public.has_active_program_access(program_id)
  )
);

-- Progresso: só pode ser criado/alterado enquanto o acesso estiver vigente.
drop policy if exists "own enrolled progress insert" on public.lesson_progress;
create policy "own enrolled progress insert"
on public.lesson_progress for insert to authenticated
with check (user_id=auth.uid() and public.has_active_program_access(program_id));

drop policy if exists "own enrolled progress update" on public.lesson_progress;
create policy "own enrolled progress update"
on public.lesson_progress for update to authenticated
using (user_id=auth.uid())
with check (user_id=auth.uid() and public.has_active_program_access(program_id));

-- Materiais: somente programas ativos e vigentes.
drop policy if exists "enrolled materials read" on public.materials;
create policy "enrolled materials read"
on public.materials for select to authenticated
using (public.is_admin() or public.has_active_program_access(program_id));

-- Agenda: eventos globais continuam visíveis; eventos de programa exigem acesso.
drop policy if exists "events auth read" on public.events;
create policy "events auth read"
on public.events for select to authenticated
using (
  public.is_admin()
  or (
    status='scheduled'
    and (program_id is null or public.has_active_program_access(program_id))
  )
);

create index if not exists idx_enroll_access
on public.enrollments(user_id, program_id, status, expires_at);
