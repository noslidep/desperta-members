-- DESPERTA MEMBERS V1 — Supabase/Postgres
create extension if not exists pgcrypto;

create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text,
 email text,
 avatar_url text,
 role text not null default 'student' check (role in ('student','admin','support')),
 phone text,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.programs (
 id uuid primary key default gen_random_uuid(), slug text unique not null, title text not null, subtitle text, description text,
 cover_url text, status text not null default 'draft' check(status in('draft','published','coming_soon','archived')),
 position int not null default 0, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.modules (
 id uuid primary key default gen_random_uuid(), program_id uuid not null references public.programs(id) on delete cascade,
 title text not null, description text, position int not null default 0, status text not null default 'published' check(status in('draft','published')),
 created_at timestamptz default now()
);
create table if not exists public.lessons (
 id uuid primary key default gen_random_uuid(), program_id uuid not null references public.programs(id) on delete cascade,
 module_id uuid not null references public.modules(id) on delete cascade, title text not null, summary text, description text,
 position int not null default 0, duration_seconds int default 0, video_provider text default 'external', video_url text, poster_url text,
 release_at timestamptz, status text not null default 'draft' check(status in('draft','published')),
 created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.enrollments (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade,
 program_id uuid not null references public.programs(id) on delete cascade, status text not null default 'active' check(status in('active','paused','cancelled','completed')),
 source text default 'manual', enrolled_at timestamptz not null default now(), expires_at timestamptz, unique(user_id,program_id)
);
create table if not exists public.lesson_progress (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade,
 program_id uuid not null references public.programs(id) on delete cascade, lesson_id uuid not null references public.lessons(id) on delete cascade,
 completed boolean not null default false, progress_seconds int not null default 0, last_viewed_at timestamptz default now(), completed_at timestamptz,
 unique(user_id,lesson_id)
);
create table if not exists public.materials (
 id uuid primary key default gen_random_uuid(), program_id uuid references public.programs(id) on delete cascade,
 module_id uuid references public.modules(id) on delete set null, lesson_id uuid references public.lessons(id) on delete set null,
 title text not null, description text, file_url text not null, file_type text default 'PDF', status text not null default 'published' check(status in('draft','published')),
 created_at timestamptz default now()
);
create table if not exists public.events (
 id uuid primary key default gen_random_uuid(), program_id uuid references public.programs(id) on delete set null,
 title text not null, description text, starts_at timestamptz not null, ends_at timestamptz,
 location_type text default 'online', location_label text, meeting_url text,
 status text not null default 'scheduled' check(status in('scheduled','completed','cancelled')), created_at timestamptz default now()
);
create table if not exists public.certificates (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade,
 program_id uuid not null references public.programs(id) on delete cascade, status text not null default 'in_progress' check(status in('in_progress','available','revoked')),
 progress int not null default 0, issued_at timestamptz, certificate_code text unique, file_url text, created_at timestamptz default now(), unique(user_id,program_id)
);
create table if not exists public.announcements (
 id uuid primary key default gen_random_uuid(), title text not null, body text not null, status text not null default 'draft' check(status in('draft','published')),
 published_at timestamptz, created_at timestamptz default now()
);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into public.profiles(id,email,full_name) values(new.id,new.email,coalesce(new.raw_user_meta_data->>'full_name','')) on conflict(id) do nothing; return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$
 select exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin');
$$;

create or replace function public.has_active_program_access(p_program_id uuid) returns boolean language sql stable security definer set search_path=public as $$
 select exists(select 1 from public.enrollments e where e.user_id=auth.uid() and e.program_id=p_program_id and e.status in ('active','completed') and (e.expires_at is null or e.expires_at>now()));
$$;
grant execute on function public.has_active_program_access(uuid) to authenticated;

alter table public.profiles enable row level security; alter table public.programs enable row level security; alter table public.modules enable row level security; alter table public.lessons enable row level security; alter table public.enrollments enable row level security; alter table public.lesson_progress enable row level security; alter table public.materials enable row level security; alter table public.events enable row level security; alter table public.certificates enable row level security; alter table public.announcements enable row level security;

-- Perfis
create policy "profile own or admin read" on public.profiles for select to authenticated using(id=auth.uid() or public.is_admin());
create policy "profile own update" on public.profiles for update to authenticated using(id=auth.uid()) with check(id=auth.uid());
create policy "admin profiles all" on public.profiles for all to authenticated using(public.is_admin()) with check(public.is_admin());
-- Conteúdo público para autenticados; escrita só admin
create policy "enrolled programs read" on public.programs for select to authenticated using(public.is_admin() or public.has_active_program_access(id));
create policy "admin programs write" on public.programs for all to authenticated using(public.is_admin()) with check(public.is_admin());
create policy "enrolled modules read" on public.modules for select to authenticated using(public.is_admin() or (status='published' and public.has_active_program_access(program_id)));
create policy "admin modules write" on public.modules for all to authenticated using(public.is_admin()) with check(public.is_admin());
create policy "enrolled lessons read" on public.lessons for select to authenticated using(public.is_admin() or (status='published' and (release_at is null or release_at<=now()) and public.has_active_program_access(program_id)));
create policy "admin lessons write" on public.lessons for all to authenticated using(public.is_admin()) with check(public.is_admin());
-- Matrículas e progresso
create policy "own enrollments read" on public.enrollments for select to authenticated using(user_id=auth.uid() or public.is_admin());
create policy "admin enrollments write" on public.enrollments for all to authenticated using(public.is_admin()) with check(public.is_admin());
create policy "own progress read" on public.lesson_progress for select to authenticated using(user_id=auth.uid() or public.is_admin());
create policy "own enrolled progress insert" on public.lesson_progress for insert to authenticated with check(user_id=auth.uid() and public.has_active_program_access(program_id));
create policy "own enrolled progress update" on public.lesson_progress for update to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid() and public.has_active_program_access(program_id));
create policy "admin progress all" on public.lesson_progress for all to authenticated using(public.is_admin()) with check(public.is_admin());
-- Materiais somente se matriculada ou admin
create policy "enrolled materials read" on public.materials for select to authenticated using(public.is_admin() or public.has_active_program_access(program_id));
create policy "admin materials write" on public.materials for all to authenticated using(public.is_admin()) with check(public.is_admin());
-- Agenda, certificados e comunicados
create policy "events auth read" on public.events for select to authenticated using(public.is_admin() or (status='scheduled' and (program_id is null or public.has_active_program_access(program_id))));
create policy "admin events write" on public.events for all to authenticated using(public.is_admin()) with check(public.is_admin());
create policy "own cert read" on public.certificates for select to authenticated using(user_id=auth.uid() or public.is_admin());
create policy "admin cert write" on public.certificates for all to authenticated using(public.is_admin()) with check(public.is_admin());
create policy "announcements auth read" on public.announcements for select to authenticated using(status='published' or public.is_admin());
create policy "admin announcements write" on public.announcements for all to authenticated using(public.is_admin()) with check(public.is_admin());

create index if not exists idx_modules_program on public.modules(program_id,position);create index if not exists idx_lessons_program_module on public.lessons(program_id,module_id,position);create index if not exists idx_enroll_user on public.enrollments(user_id,status);create index if not exists idx_enroll_access on public.enrollments(user_id,program_id,status,expires_at);create index if not exists idx_progress_user_program on public.lesson_progress(user_id,program_id);create index if not exists idx_events_start on public.events(starts_at);
