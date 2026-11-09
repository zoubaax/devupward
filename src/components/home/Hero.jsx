import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { SOCIAL_LINKS } from '../../data/navigation'
import SwarmCursor from './SwarmCursor'
import heroArtwork from '../../assets/hero-artwork.jpg'

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000, active: false })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000, active: false })
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen min-h-[720px] bg-[#000000] text-white flex items-center pt-16 overflow-hidden select-none cursor-crosshair group"
    >
      {/* 1. Fullscreen Background Image & SwarmCursor Canvas */}
      <div className="absolute inset-0 w-full h-full">
        <SwarmCursor
          count={850}
          size={2.6}
          spread={95}
          swirl={0.6}
          clickEffect="burst"
          color="#FFAA55"
          accentColor="#FF5500"
          className="w-full h-full"
        >
          {/* Base Artwork - Shifted right (64% 38%) for editorial balance */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-[64%_38%] bg-no-repeat opacity-90 filter brightness-95 contrast-110"
            style={{ backgroundImage: `url(${heroArtwork})` }}
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60 pointer-events-none z-10" />

          {/* Dynamic Torch Light on Hover (Over Artwork) */}
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-200"
            style={{
              opacity: mousePos.active ? 1 : 0,
              maskImage: `radial-gradient(circle 360px at ${mousePos.x}px ${mousePos.y}px, black 25%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle 360px at ${mousePos.x}px ${mousePos.y}px, black 25%, transparent 100%)`,
            }}
          >
            <div 
              className="w-full h-full bg-cover bg-[64%_38%] bg-no-repeat filter brightness-150 contrast-160"
              style={{ backgroundImage: `url(${heroArtwork})` }}
            />
            {/* Ambient warm amber glow following the cursor */}
            <div 
              className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#FF6600]/30 rounded-full blur-3xl"
              style={{
                left: mousePos.x,
                top: mousePos.y,
              }}
            />
          </div>
        </SwarmCursor>
      </div>

      {/* 2. Middle-Left Hero Composition: Single Crisp Layer */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-12 pointer-events-auto">
        <div className="max-w-lg flex flex-col gap-6">
          
          {/* Headline in exactly 2 lines with italic serif contrast */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight leading-[1.15] drop-shadow-2xl">
            <span className="text-white block font-medium whitespace-nowrap">
              Where builders connect
            </span>
            <span className="text-white/80 block mt-1 font-light whitespace-nowrap">
              the <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#FF7722] to-[#FFAA44] px-0.5">architecture</span> they believe in
            </span>
          </h1>

          {/* CTAs: Linkmake-style pill buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={SOCIAL_LINKS.discord}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-white text-black text-xs font-mono uppercase tracking-wider font-semibold hover:bg-white/90 transition-all flex items-center justify-center gap-2 group shadow-2xl"
            >
              <span>Enter Discord Guild</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-md text-xs font-mono text-white/80">
              <span className="text-[#FF5500]">$</span>
              <span>npx devupward</span>
            </div>
          </div>

          {/* Interaction hint */}
          <div className="text-[10px] font-mono text-white/35 tracking-widest uppercase flex items-center gap-2 pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
            <span>Hover to illuminate • Click to burst</span>
          </div>

        </div>
      </div>

    </section>
  )
}
