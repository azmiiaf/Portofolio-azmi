-- ============================================================
-- Jalankan SQL ini di Supabase SQL Editor (project kamu)
-- ============================================================

-- Profil
create table if not exists profile (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  short_desc text,
  about text,
  skills text[] default '{}',
  photo_url text,
  updated_at timestamptz default now()
);

-- Pendidikan
create table if not exists education (
  id uuid primary key default gen_random_uuid(),
  school text not null,
  major text not null,
  year_start int not null,
  year_end int,
  created_at timestamptz default now()
);

-- Lisensi & Sertifikasi
create table if not exists certification (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null,
  year_start int not null,
  year_end int,
  created_at timestamptz default now()
);

-- Projek
create table if not exists project (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null default 'Website',
  tags text[] default '{}',
  image_url text,
  link text,
  year int,
  created_at timestamptz default now()
);

-- Experience
create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  org text not null,
  type text not null,
  year_start int not null,
  year_end int,
  description text,
  created_at timestamptz default now()
);

-- Kontak
create table if not exists contact (
  id uuid primary key default gen_random_uuid(),
  email text,
  github_url text,
  linkedin_url text,
  whatsapp text,
  updated_at timestamptz default now()
);

-- Visitor Logs
create table if not exists visitor_log (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  method text not null default 'GET',
  device_type text,
  os text,
  browser text,
  referrer text,
  ip text,
  user_agent text,
  visited_at timestamptz default now()
);

-- Index untuk performa query logs
create index if not exists visitor_log_visited_at_idx on visitor_log (visited_at desc);
create index if not exists visitor_log_path_idx on visitor_log (path);

-- ============================================================
-- Seed data awal dari content.js
-- ============================================================

insert into profile (name, role, short_desc, about, skills) values (
  'M. Azmi Al Fadillah',
  'Fullstack Developer | Frontend Developer',
  'Fresh Graduate S1 Informatika UBHARA Jaya. Saya memiliki ketertarikan dengan pengembangan perangkat lunak, dan telah memiliki pengalaman dalam mengembangkan perangkat lunak, saat di kampus aktif di organisasi Developer Student Club menjadi Lead of Frontend Developer.',
  'Saya baru saja lulus dari Universitas Bhayangkara Jakarta Raya dengan gelar Sarjana Informatika. Untuk skripsi saya, saya membangun sistem informasi bank sampah dari nol, mulai dari perancangan database, backend API, hingga frontend UI. Fokus saya adalah membangun antarmuka yang responsif menggunakan React Js, Express Js dan Tailwind CSS. Saya tertarik pada aspek praktis dalam pengembangan web.',
  ARRAY['Tailwind CSS', 'JavaScript', 'HTML', 'CSS', 'Prisma', 'Node JS', 'Express JS', 'React JS', 'Git', 'PHP', 'GitHub', 'Laravel']
) on conflict do nothing;

insert into education (school, major, year_start, year_end) values
  ('Universitas Bhayangkara Jakarta Raya', 'Informatika', 2022, 2026),
  ('SMA Taman Harapan 1 Bekasi', 'MIPA', 2020, 2022)
on conflict do nothing;

insert into certification (title, issuer, year_start, year_end) values
  ('DSC-Lead Frontend', 'Developer Student Club Ubhara Jaya', 2026, 2026),
  ('Junior Web Developer', 'BNSP', 2025, 2028),
  ('Belajar Dasar Pemrograman Javascript', 'Dicoding', 2024, 2027),
  ('Belajar Dasar Pemrograman Web', 'Dicoding', 2024, 2027),
  ('Belajar Membuat Aplikasi Web dengan React', 'Dicoding', 2024, 2027)
on conflict do nothing;

insert into project (title, type, tags, link, year) values
  ('TaskCo', 'Website', ARRAY['React js', 'Tailwind CSS', 'Supabase'], 'https://taskcoo.vercel.app/', 2026),
  ('Moneta', 'Mobile App', ARRAY['Flutter', 'Supabase'], 'https://github.com/azmiiaf/moneta', 2026),
  ('Job Tracker', 'Website', ARRAY['React', 'Tailwind CSS', 'Supabase'], 'https://jobtracker-ivory.vercel.app/', 2026),
  ('Photobooth 17An', 'Website', ARRAY['React', 'Tailwind CSS', 'Supabase'], 'https://photobooth-darmabakti.vercel.app/', 2026),
  ('Sistem Informasi Bank Sampah', 'Website', ARRAY['React js', 'Tailwind CSS', 'MySQL', 'REST API'], 'https://github.com/azmiiaf/skripsi-baktialam', 2026)
on conflict do nothing;

insert into experience (title, org, type, year_start, year_end, description) values
  ('Projek Sistem Informasi Bank Sampah', 'UBHARA Jaya', 'Projek Skripsi', 2026, 2026, 'Sistem informasi bank sampah berbasis web dengan perankingan nasabah metode VIKOR.'),
  ('Penanggung Jawab Lomba Frontend- DSCompetition', 'Developer Student Club', 'Event UKM', 2025, 2025, 'Menjadi PJ lomba frontend di kompetisi DSC.'),
  ('Lead Frontend Developer - Developer Student Club (DSC)', 'Developer Student Club', 'Organisasi', 2025, 2026, 'Melakukan mentoring kepada member yang ingin membangun web dari sisi Frontend.'),
  ('Internship di Div.SITIK Polres Metro Bekasi Kota', 'Polres Metro Bekasi Kota', 'Magang', 2025, 2025, 'Internship divisi SITIK.'),
  ('Vokara Cup', 'Developer Student Club', 'Event UKM', 2024, 2024, 'Event tahunan UKM DSC.')
on conflict do nothing;

insert into contact (email, github_url, linkedin_url, whatsapp) values
  ('m.azmialfadillah19@gmail.com', 'https://github.com/azmiiaf/', 'https://www.linkedin.com/in/m-azmi-al-fadillah/', 'https://wa.me/6288298139408')
on conflict do nothing;
