-- ============================================================
-- FIX PERMISSION & ROW LEVEL SECURITY SUPABASE
-- Jalankan query ini di: Supabase Dashboard > SQL Editor > Run
-- ============================================================

-- 1. Berikan izin penuh pada schema public ke role anon dan authenticated
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;

-- 2. Nonaktifkan Row Level Security (RLS) pada seluruh tabel
-- Supaya backend Next.js dengan API anon key dapat membaca & mengubah data tanpa permission denied
ALTER TABLE IF EXISTS profile DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS education DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS certification DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS project DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS experience DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS contact DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS visitor_log DISABLE ROW LEVEL SECURITY;

-- 3. Pastikan kolom timestamps ada di semua tabel agar query tidak error
ALTER TABLE IF EXISTS profile ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();
ALTER TABLE IF EXISTS profile ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

ALTER TABLE IF EXISTS education ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();
ALTER TABLE IF EXISTS education ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

ALTER TABLE IF EXISTS certification ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();
ALTER TABLE IF EXISTS certification ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

ALTER TABLE IF EXISTS project ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();
ALTER TABLE IF EXISTS project ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

ALTER TABLE IF EXISTS experience ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();
ALTER TABLE IF EXISTS experience ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

ALTER TABLE IF EXISTS contact ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();
ALTER TABLE IF EXISTS contact ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
