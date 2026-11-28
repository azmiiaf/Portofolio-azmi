import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const defaultServices = [
  {
    title: 'Web dan Landing Page',
    icon: 'star4',
    description: 'Situs responsif yang sesuai identitas brand atau kebutuhan acara.',
    items: ['Portofolio', 'Company profile', 'Landing page'],
  },
  {
    title: 'Aplikasi Web',
    icon: 'diamond',
    description: 'Sistem informasi dengan dashboard, login, dan database.',
    items: ['Dashboard admin', 'Sistem informasi', 'Integrasi API'],
  },
  {
    title: 'Interaksi dan Animasi',
    icon: 'circle',
    description: 'Gerakan yang membantu orang memahami halaman, bukan sekadar hiasan.',
    items: ['Animasi scroll GSAP', 'Mikro-interaksi', 'Integrasi WhatsApp'],
  },
]

export async function GET() {
  try {
    const [
      profileRes,
      educationRes,
      certificationRes,
      projectRes,
      experienceRes,
      contactRes,
    ] = await Promise.all([
      supabase.from('profile').select('*').limit(1).maybeSingle(),
      supabase.from('education').select('*').order('year_start', { ascending: false }),
      supabase.from('certification').select('*').order('year_start', { ascending: false }),
      supabase.from('project').select('*').order('created_at', { ascending: true }),
      supabase.from('experience').select('*').order('year_start', { ascending: false }),
      supabase.from('contact').select('*').limit(1).maybeSingle(),
    ])

    const profile = profileRes.data || {}
    const contact = contactRes.data || {}
    const projectList = projectRes.data || []
    const certList = certificationRes.data || []
    const expList = experienceRes.data || []
    const eduList = educationRes.data || []

    const name = profile.name || 'M. Azmi Al Fadillah'
    const nameWords = name.trim().toUpperCase().split(/\s+/)
    const mid = Math.ceil(nameWords.length / 2)
    const lines = nameWords.length <= 2
      ? [nameWords[0] || 'M. AZMI', nameWords[1] || 'AL FADILLAH']
      : [nameWords.slice(0, mid).join(' '), nameWords.slice(mid).join(' ')]

    const site = {
      name,
      lines,
      label: ['Terbuka untuk magang', 'dan entry-level'],
      role: profile.role || 'Fullstack Developer | Front-End Developer',
      location: 'Bekasi, Indonesia',
      statement: profile.short_desc || 'Front-End Developer dan pengembangan aplikasi Full-stack',
      email: contact.email || 'm.azmialfadillah19@gmail.com',
      cv: profile.cv_url || '/cv/CV_M_Azmi_Al_Fadillah_Frontend-Developer.pdf',
      heroImage: '/images/hero1.mp4',
      aboutImage: profile.photo_url || '/images/about.png',
      about: profile.about || 'Saya memiliki ketertarikan dengan pengembangan perangkat lunak...',
      stats: [
        { value: certList.length || 5, label: 'Sertifikasi' },
        { value: projectList.length || 5, label: 'Proyek' },
      ],
      socials: [
        { label: 'GitHub', href: contact.github_url || 'https://github.com/azmiiaf', icon: 'github' },
        { label: 'LinkedIn', href: contact.linkedin_url || 'https://www.linkedin.com/in/m-azmi-al-fadillah/', icon: 'linkedin' },
        { label: 'Email', href: contact.email ? `mailto:${contact.email}` : 'mailto:m.azmialfadillah19@gmail.com', icon: 'mail' },
      ],
      serviceDesc: 'Saya membangun produk digital dengan menekankan keseimbangan antara desain sistem yang matang dan performa, mulai dari situs web responsif hingga integrasi API.',
      whatsapp: contact.whatsapp || 'https://wa.me/6288298139408',
      motto: ['Belajar', 'Bangun', 'Rilis'],
      contactLines: ["Let's Build", 'Something'],
    }

    const formattedProjects = projectList.map((p, i) => ({
      id: p.id,
      title: p.title,
      tags: Array.isArray(p.tags) ? p.tags : [],
      year: p.year ? String(p.year) : '2026',
      image: p.image_url || `/images/project-${(i % 5) + 1}.png`,
      link: p.link || '#',
    }))

    const projects = formattedProjects.slice(0, 3)
    const moreProjects = formattedProjects.slice(3)

    const certificates = certList.map((c, i) => ({
      id: c.id,
      title: c.title,
      subtitle: c.issuer,
      year: c.year_end ? `${c.year_start} - ${c.year_end}` : String(c.year_start),
      image: c.image_url || `/images/cert-${(i % 5) + 1}.png`,
    }))

    const experience = expList.map((e) => ({
      id: e.id,
      role: e.title,
      org: e.org,
      date: e.year_end ? `${e.year_start} - ${e.year_end}` : String(e.year_start),
      description: e.description || '',
    }))

    const skills = Array.isArray(profile.skills) && profile.skills.length > 0
      ? profile.skills
      : ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'Node.js', 'Express.js', 'Supabase', 'Git']

    const stack = [
      { category: 'Front-end', items: skills.filter((s) => ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML', 'CSS', 'Vite', 'React JS', 'Flutter'].includes(s)) },
      { category: 'Back-end & Database', items: skills.filter((s) => ['Node.js', 'Express.js', 'Supabase', 'MySQL', 'Prisma', 'PHP', 'Laravel', 'REST API', 'Node JS', 'Express JS'].includes(s)) },
      { category: 'Tools & Ekosistem', items: skills.filter((s) => ['Git', 'GitHub', 'Vercel', 'Postman', 'VS Code'].includes(s)) },
    ].filter((g) => g.items.length > 0)

    if (stack.length === 0) {
      stack.push({ category: 'Keahlian Utama', items: skills })
    }

    return NextResponse.json({
      site,
      projects,
      moreProjects,
      certificates,
      experience,
      stack,
      services: defaultServices,
      education: eduList,
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Gagal mengambil data portofolio dari Supabase', details: err.message },
      { status: 500 }
    )
  }
}
