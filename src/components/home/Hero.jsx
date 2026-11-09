import React, { useRef, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { SOCIAL_LINKS } from '../../data/navigation'
import ShinyText from '../reactbits/ShinyText'
import { InteractivePointCloud } from './InteractivePointCloud'

export function Hero() {
  const sectionRef = useRef(null)
  const zoomRef = useRef(null)
  const darkenRef = useRef(null)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const progress = Math.min(Math.max(scrollY / 800, 0), 1)
          if (zoomRef.current) {
            zoomRef.current.style.transform = `scale(${1 + progress * 0.32})`
          }
          if (darkenRef.current) {
            darkenRef.current.style.opacity = `${progress * 0.5}`
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen min-h-[680px] bg-[#08090C] text-[#F3F4F6] flex items-center justify-center pt-16 overflow-hidden select-none group"
    >
      {/* 1. Fullscreen Background with Scroll-Driven Zoom */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div 
          ref={zoomRef}
          className="absolute inset-0 w-full h-full will-change-transform [transform:scale(1)]"
          style={{
            transformOrigin: '50% 55%',
            transition: 'transform 0.08s ease-out',
          }}
        >
          {/* Ambient Warm Golden Atmosphere in Center behind touching hands (diffused, organic) */}
          <div 
            className="absolute top-1/2 left-1/2 md:left-[62%] -translate-x-1/2 -translate-y-1/2 w-[520px] h-[340px] rounded-[50%] blur-[130px] pointer-events-none opacity-30"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255, 95, 0, 0.45) 0%, rgba(255, 140, 0, 0.15) 45%, transparent 70%)'
            }}
          />

          {/* Live Interactive Point Cloud: ALL grey points of the figures & dune move on cursor hover */}
          <InteractivePointCloud className="z-10" />

          {/* Vignette Gradients smoothly blending into #08090C */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-[#08090C]/70 pointer-events-none z-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08090C]/85 via-transparent to-[#08090C]/70 pointer-events-none z-20" />
        </div>

        {/* Gentle darkening overlay as user scrolls down */}
        <div 
          ref={darkenRef}
          className="absolute inset-0 bg-[#08090C] pointer-events-none z-20 transition-opacity duration-100 opacity-0"
        />
      </div>

      {/* 2. Content Lockup - Centered directly in the middle */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-12 pointer-events-auto flex items-center justify-center md:justify-start">
        <div className="max-w-xl mx-auto md:mx-0 flex flex-col items-center md:items-start text-center md:text-left gap-5 sm:gap-6">
          
          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight leading-[1.18] sm:leading-[1.15] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            <span className="text-white block font-medium [text-shadow:_0_2px_14px_rgb(0_0_0_/_95%)]">
              Where builders connect
            </span>
            <span className="text-white/85 block mt-1 font-light [text-shadow:_0_2px_14px_rgb(0_0_0_/_95%)]">
              the <ShinyText color="#FF5500" shineColor="#FFAA55" speed={3.5} className="font-serif italic font-normal px-0.5 filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">architecture</ShinyText> they believe in
            </span>
          </h1>

          {/* CTAs: Side-by-side pills */}
          <div className="flex flex-row flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
            <a
              href={SOCIAL_LINKS.discord}
              target="_blank"
              rel="noreferrer"
              className="px-6 sm:px-7 py-3 rounded-full bg-white text-black text-xs font-mono uppercase tracking-wider font-semibold hover:bg-white/90 transition-all flex items-center justify-center gap-2 group shadow-2xl"
            >
              <span>Enter Discord Guild</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/[0.12] bg-[#0D0E15]/80 backdrop-blur-md text-xs font-mono text-white/80 shadow-xl">
              <span className="text-[#FF5500]">$</span>
              <span>npx devupward</span>
            </div>
          </div>

          {/* Interaction hint */}
          <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase flex items-center justify-center md:justify-start gap-2 pt-1 drop-shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
            <span className="hidden sm:inline">Move cursor over figures to disperse points</span>
            <span className="sm:hidden">Touch figures to disperse points</span>
          </div>

        </div>
      </div>

    </section>
  )
}
