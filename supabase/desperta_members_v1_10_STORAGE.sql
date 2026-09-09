-- DESPERTA MEMBERS V1.10 — Supabase Storage
-- Execute uma única vez no SQL Editor do Supabase antes de testar os uploads.

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values (
  'program-covers','program-covers',true,5242880,
  array['image/png','image/jpeg','image/webp']
)
on conflict (id) do update
set public=true,file_size_limit=5242880,allowed_mime_types=excluded.allowed_mime_types;

insert into storage.buckets (id,name,public,file_size_limit)
values ('program-materials','program-materials',false,52428800)
on conflict (id) do update
set public=false,file_size_limit=52428800;

drop policy if exists "admin covers select" on storage.objects;
drop policy if exists "admin covers insert" on storage.objects;
drop policy if exists "admin covers update" on storage.objects;
drop policy if exists "admin covers delete" on storage.objects;
drop policy if exists "admin materials select" on storage.objects;
drop policy if exists "admin materials insert" on storage.objects;
drop policy if exists "admin materials update" on storage.objects;
drop policy if exists "admin materials delete" on storage.objects;

create policy "admin covers select" on storage.objects for select to authenticated
using (bucket_id='program-covers' and public.is_admin());
create policy "admin covers insert" on storage.objects for insert to authenticated
with check (bucket_id='program-covers' and public.is_admin());
create policy "admin covers update" on storage.objects for update to authenticated
using (bucket_id='program-covers' and public.is_admin())
with check (bucket_id='program-covers' and public.is_admin());
create policy "admin covers delete" on storage.objects for delete to authenticated
using (bucket_id='program-covers' and public.is_admin());

create policy "admin materials select" on storage.objects for select to authenticated
using (bucket_id='program-materials' and public.is_admin());
create policy "admin materials insert" on storage.objects for insert to authenticated
with check (bucket_id='program-materials' and public.is_admin());
create policy "admin materials update" on storage.objects for update to authenticated
using (bucket_id='program-materials' and public.is_admin())
with check (bucket_id='program-materials' and public.is_admin());
create policy "admin materials delete" on storage.objects for delete to authenticated
using (bucket_id='program-materials' and public.is_admin());
