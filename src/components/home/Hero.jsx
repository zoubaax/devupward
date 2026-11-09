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
      className="relative w-full h-screen min-h-[720px] bg-[#000000] text-white flex items-center pt-16 overflow-hidden select-none cursor-crosshair"
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
          {/* Base Artwork - Scaled & Positioned to eliminate excess black space at the top */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-[center_35%] bg-no-repeat opacity-90 filter brightness-95 contrast-110"
            style={{ backgroundImage: `url(${heroArtwork})` }}
          />

          {/* Vignette Gradients: Smoothly fades edges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/60 pointer-events-none z-10" />

          {/* Dynamic Torch Light on Hover */}
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-200"
            style={{
              opacity: mousePos.active ? 1 : 0,
              maskImage: `radial-gradient(circle 340px at ${mousePos.x}px ${mousePos.y}px, black 25%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle 340px at ${mousePos.x}px ${mousePos.y}px, black 25%, transparent 100%)`,
            }}
          >
            <div 
              className="w-full h-full bg-cover bg-[center_35%] bg-no-repeat filter brightness-150 contrast-160"
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

      {/* 2. Middle-Left Hero Composition: Headline + Buttons Stacked Down Below It */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-12 pointer-events-auto">
        <div className="max-w-xl flex flex-col gap-6">
          
          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.08] drop-shadow-2xl">
            <span className="text-white block font-medium">Where builders connect</span>
            <span className="text-white/40 block font-light">the architecture</span>
            <span className="text-white/40 block font-light">they believe in</span>
          </h1>

          {/* CTAs positioned down below the text */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
            <a
              href={SOCIAL_LINKS.discord}
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3 bg-white text-black text-xs font-mono uppercase tracking-widest font-semibold hover:bg-white/90 transition-all flex items-center justify-center gap-2 group shadow-2xl"
            >
              <span>Enter Discord Guild</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex items-center justify-center gap-2 px-4 py-3 border border-white/20 bg-black/60 backdrop-blur-md text-xs font-mono text-white/80">
              <span className="text-[#FF5500]">$</span>
              <span>npx devupward</span>
            </div>
          </div>

          {/* Interaction hint */}
          <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
            <span>Hover to illuminate • Click to burst</span>
          </div>

        </div>
      </div>

    </section>
  )
}
