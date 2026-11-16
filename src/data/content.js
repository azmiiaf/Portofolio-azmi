// Semua teks dan path gambar ada di sini. Ganti gambar: taruh file di /public/images lalu ubah path-nya.
// Bagian bertanda [tahun] / [Tulis ...] masih placeholder dari file kamu, isi sendiri ya.
export const site = {
  name: "Azmi",
  lines: ["M. AZMI", "AL FADILLAH"],
  label: ["Terbuka untuk magang", "dan entry-level"],
  role: "Fullstack Developer | Front-End Developer",
  location: "Bekasi, Indonesia",
  statement: "Front-End Developer dan pengembangan aplikasi Full-stack",
  email: "m.azmialfadillah19@gmail.com",
  cv: "/cv/CV_M_Azmi_Al_Fadillah_Frontend-Developer.pdf",
  heroImage: "/images/hero1.mp4",
  aboutImage: "/images/about.png",
  about:
    "Fresh Graduate S1 Informatika UBHARA Jaya. Saya memiliki ketertarikan dengan pengembangan perangkat lunak, dan telah memiliki pengalaman dalam mengembangkan perangkat lunak, saat di kampus aktif di organisasi Developer Student Club menjadi Lead of Frontend Developer.",
  stats: [
    { value: 5, label: "Sertifikasi" },
    { value: 5, label: "Proyek" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/azmiiaf", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/m-azmi-al-fadillah/", icon: "linkedin" },
    { label: "Email", href: "mailto:m.azmialfadillah19@gmail.com", icon: "mail" },
  ],
  serviceDesc:
    "Saya membangun produk digital dengan menekankan keseimbangan antara desain sistem yang matang dan memperhatikan performa, mulai dari situs web responsif hingga aplikasi web yang dapat diintegrasikan dengan AI.",
  whatsapp: "https://wa.me/6288298139408",
  motto: ["Belajar", "Bangun", "Rilis"],
  contactLines: ["Let's Build", "Something"],
}

export const navLinks = [
  { label: "Layanan", href: "#layanan" },
  { label: "Perjalanan", href: "#perjalanan" },
  { label: "Proyek", href: "#proyek" },
  { label: "Tentang", href: "#tentang" },
  { label: "Sertifikasi", href: "#sertifikasi" },
  { label: "Kontak", href: "#kontak" },
]

export const services = [
  {
    title: "Web dan Landing Page",
    icon: "star4",
    description: "Situs responsif yang sesuai identitas brand atau kebutuhan acara.",
    items: ["Portofolio", "Company profile", "Landing page"],
  },
  {
    title: "Aplikasi Web",
    icon: "diamond",
    description: "Sistem informasi dengan dashboard, login, dan database.",
    items: ["Dashboard admin", "Sistem informasi", "Integrasi API"],
  },
  {
    title: "Interaksi dan Animasi",
    icon: "circle",
    description: "Gerakan yang membantu orang memahami halaman, bukan sekadar hiasan.",
    items: ["Animasi scroll GSAP", "Mikro-interaksi", "Integrasi WhatsApp"],
  },
]

export const experience = [
  {
    role: "Sertifikasi",
    org: "BNSP, BPPTIK/Komdigi, Dicoding",
    date: "2025",
    description: "Sertifikasi Junior Web Developer",
  },
  {
    role: "Lead of Frontend Developer",
    org: "Developer Student Club",
    date: "2025-2026",
    description: "melakukan mentoring kepada member yang ingin membangun web dari sisi Frontend",
  },
  {
    role: "Skripsi: Project Web Bakti Alam",
    org: "UBHARA Jaya",
    date: "2026",
    description: "Sistem informasi bank sampah berbasis web dengan perankingan nasabah metode VIKOR.",
  },
  {
    role: "S1 Informatika",
    org: "UBHARA Jaya",
    date: "2026",
    description: "Lulus Tepat waktu dalam keadaan S.Kom.",
  },
]

export const projects = [
  { title: "SISTEM INFORMASI BANK SAMPAH - BAKTI ALAM", tags: ["React js", "Tailwind CSS", "MySQL", "REST API"], year: "2026", image: "/images/project-1.png", link: "https://github.com/azmiiaf/skripsi-baktialam" },
  { title: "Photobooth", tags: ["React", "Tailwind CSS", "Supabase"], year: "2026", image: "/images/project-2.png", link: "https://photobooth-darmabakti.vercel.app/" },
  { title: "JobTracker", tags: ["React", "Tailwind CSS", "Supabase"], year: "2026", image: "/images/project-3.png", link: "https://jobtracker-ivory.vercel.app/" },
]

// Digabung dengan `projects` di satu galeri horizontal
export const moreProjects = [
  { title: "TaskCo - Manajemen Tugas Pribadi", tags: ["React js", "Tailwind CSS", "Supabase"], image: "/images/project-4.png", link: "https://taskcoo.vercel.app/" },
  { title: "Moneta - Manajemen Keuangan Pribadi", tags: ["Flutter", "Supabase"], image: "/images/project-5.png", link: "https://github.com/azmiiaf/moneta" },
]

export const stack = [
  { category: "Front-end", items: ["React", "Next.js", "Vite", "Tailwind CSS", "JavaScript"] },
  { category: "Back-end dan DB", items: ["Node.js", "Express.js", "MySQL", "Supabase", "REST API", "Prisma", "PHP", "Laravel"] },
  { category: "Tools", items: ["Git", "GitHub", "Vercel", "Postman", "VS Code"] },
]

export const certificates = [
  { title: "Lead of Frontend Developer", subtitle: "Developer Student Club", image: "/images/cert-1.png" },
  { title: "Belajar Dasar Pemrograman Javascript", subtitle: "Dicoding", image: "/images/cert-2.png" },
  { title: "Belajar Dasar Pemrograman Web", subtitle: "Dicoding", image: "/images/cert-3.png" },
  { title: "Belajar Membuat Aplikasi Web dengan React", subtitle: "Dicoding", image: "/images/cert-4.png" },
  { title: "Junior Web Developer", subtitle: "BNSP", image: "/images/cert-5.jpeg" },
]

// Halaman login
export const landing = {
  lines: ["Portofolio", "Azmi"],
  description:
    "Halaman portofolio ini hanya bisa dibuka setelah masuk. Silakan login untuk melihat proyek, perjalanan, dan sertifikasi saya.",
}
