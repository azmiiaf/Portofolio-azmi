// Visitor tracking hook untuk portfolio pages
// Panggil di root page.js agar tiap kunjungan tercatat
'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useVisitorLog() {
  const pathname = usePathname()

  useEffect(() => {
    // Jangan catat jika di admin area
    if (pathname.startsWith('/admin')) return

    fetch('/api/log-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathname,
        method: 'GET',
        referrer: document.referrer || '',
      }),
    }).catch(() => {}) // silent fail, non-blocking
  }, [pathname])
}
