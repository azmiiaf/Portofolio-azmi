import { IBM_Plex_Sans_Devanagari, Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'
import Cursor from '../components/layout/Cursor'
import SmoothScroll from '../components/layout/SmoothScroll'

const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk' })
const mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-mono' })
const devanagri = IBM_Plex_Sans_Devanagari({
  subsets: ['latin'],
  variable: "--font-devanagri",
  weight: ['300','500']
})

export const metadata = {
  title: 'M. Azmi Al Fadillah — Fullstack Developer',
  description: 'Portofolio M. Azmi Al Fadillah',
  icons: {
    icon: '/images/icon.jpeg'
  }
}


export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${grotesk.variable} ${devanagri.variable} ${mono.variable}`}>
      <body className="font-sans">
        <Cursor />
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
