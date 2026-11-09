import React from 'react'
import { Hero } from '../components/home/Hero'
import { Stats } from '../components/home/Stats'
import { Pillars } from '../components/home/Pillars'
import { Tracks } from '../components/home/Tracks'
import { TeamSection } from '../components/team/TeamSection'
import { Events } from '../components/home/Events'
import { Showcase } from '../components/home/Showcase'
import { Testimonials } from '../components/home/Testimonials'
import { Faq } from '../components/home/Faq'
import { CtaBanner } from '../components/home/CtaBanner'
import { Footer } from '../components/common/Footer'

export function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Stats />
        <Pillars />
        <Tracks />
        <TeamSection />
        <Events />
        <Showcase />
        <Testimonials />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  )
}
