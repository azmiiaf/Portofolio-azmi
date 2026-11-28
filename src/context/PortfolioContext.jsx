'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const initialData = {
  site: {
    name: '',
    lines: ['M. AZMI', 'AL FADILLAH'],
    role: '',
    statement: '',
    location: 'Bekasi, Indonesia',
    about: '',
    aboutImage: '/images/about.png',
    heroImage: '/images/hero1.mp4',
    cv: '/cv/CV_M_Azmi_Al_Fadillah_Frontend-Developer.pdf',
    stats: [],
    socials: [],
    motto: ['Belajar', 'Bangun', 'Rilis'],
    contactLines: ["Let's Build", 'Something'],
    label: ['Terbuka untuk magang', 'dan entry-level'],
  },
  projects: [],
  moreProjects: [],
  experience: [],
  certificates: [],
  stack: [],
  services: [],
  education: [],
}

const PortfolioContext = createContext({
  ...initialData,
  isLoaded: false,
})

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(initialData)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let active = true

    fetch('/api/portfolio')
      .then((res) => {
        if (!res.ok) throw new Error('Gagal memuat data dari Supabase')
        return res.json()
      })
      .then((d) => {
        if (active && d && d.site) {
          setData(d)
          setIsLoaded(true)
        }
      })
      .catch((err) => {
        console.error('PortfolioContext fetch error:', err)
        if (active) {
          setIsLoaded(true)
        }
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <PortfolioContext.Provider value={{ ...data, isLoaded }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  return useContext(PortfolioContext)
}
