import { IntroProvider } from '../components/layout/Intro'
import ScrollProgress from '../components/layout/ScrollProgress'
import Navbar from '../components/layout/Navbar'
import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import Journey from '../components/sections/Journey'
import Projects from '../components/sections/Projects'
import About from '../components/sections/About'
import Stack from '../components/sections/Stack'
import Certificates from '../components/sections/Certificates'
import Motto from '../components/sections/Motto'
import Contact from '../components/sections/Contact'

export default function Home() {
  return (
    <IntroProvider>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Journey />
        <Projects />
        <About />
        <Stack />
        <Certificates />
        <Motto />
        <Contact />
      </main>
    </IntroProvider>
  )
}
