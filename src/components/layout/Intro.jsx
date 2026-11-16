'use client'
import { createContext, useContext, useState } from 'react'
import { ScrollTrigger } from '../../lib/gsap'
import Preloader from './Preloader'

// "ready" = true setelah preloader selesai. Hero baca ini untuk mulai animasi masuk.
const IntroContext = createContext(false)
export const useIntro = () => useContext(IntroContext)

export function IntroProvider({ children }) {
  const [ready, setReady] = useState(false)

  const done = () => {
    setReady(true)
    setTimeout(() => ScrollTrigger.refresh(), 100)
  }

  return (
    <IntroContext.Provider value={ready}>
      {!ready && <Preloader onDone={done} />}
      {children}
    </IntroContext.Provider>
  )
}
