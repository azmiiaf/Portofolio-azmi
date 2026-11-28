'use client'
import { createContext, useContext, useState } from 'react'
import { ScrollTrigger } from '../../lib/gsap'
import Preloader from './Preloader'
import { usePortfolio } from '../../context/PortfolioContext'

const IntroContext = createContext(false)
export const useIntro = () => useContext(IntroContext)

export function IntroProvider({ children }) {
  const [ready, setReady] = useState(false)
  const { isLoaded } = usePortfolio()

  const done = () => {
    setReady(true)
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      setTimeout(() => ScrollTrigger.refresh(), 300)
      setTimeout(() => ScrollTrigger.refresh(), 800)
    })
  }

  return (
    <IntroContext.Provider value={ready}>
      {!ready && <Preloader isLoaded={isLoaded} onDone={done} />}
      <div className={ready ? 'opacity-100 transition-opacity duration-300' : 'opacity-0'}>
        {children}
      </div>
    </IntroContext.Provider>
  )
}
