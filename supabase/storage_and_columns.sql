-- ============================================================
-- SQL SETUP: Storage Bucket & Kolom Tambahan untuk Upload File
-- Jalankan file ini di Supabase Dashboard -> SQL Editor -> Run
-- ============================================================

-- 1. Tambahkan kolom cv_url di profile (untuk file CV PDF)
alter table profile add column if not exists cv_url text;

-- 2. Tambahkan kolom image_url di certification (untuk foto/PDF sertifikat)
alter table certification add column if not exists image_url text;

-- 3. Buat bucket 'portfolio' di Supabase Storage (public)
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do update set public = true;

-- 4. Set policy agar file di bucket 'portfolio' bisa dibaca dan diupload
do $$
begin
  -- Policy Select (Public Read)
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'Public Access') then
    create policy "Public Access" on storage.objects for select using ( bucket_id = 'portfolio' );
  end if;

  -- Policy Insert (Upload)
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'Public Upload') then
    create policy "Public Upload" on storage.objects for insert with check ( bucket_id = 'portfolio' );
  end if;

  -- Policy Update
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'Public Update') then
    create policy "Public Update" on storage.objects for update using ( bucket_id = 'portfolio' );
  end if;

  -- Policy Delete
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'Public Delete') then
    create policy "Public Delete" on storage.objects for delete using ( bucket_id = 'portfolio' );
  end if;
end $$;
