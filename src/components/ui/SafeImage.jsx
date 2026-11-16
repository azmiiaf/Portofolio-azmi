'use client'
import { useState } from 'react'

// Kalau file gambar belum ada, tampil kotak pengganti (bukan gambar rusak)
export default function SafeImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div className={`flex items-center justify-center bg-white/5 p-4 text-center font-mono text-sm opacity-50 ${className}`}>
        {alt}
      </div>
    )
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} onError={() => setFailed(true)} className={`object-cover ${className}`} />
}