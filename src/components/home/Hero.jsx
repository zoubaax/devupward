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
    <section className="relative w-full h-screen max-h-screen bg-[#000000] text-white flex flex-col justify-between pt-20 pb-10 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden select-none">
      
      {/* 1. Point-Cloud Artwork, Torch Illumination & Swarm Visual */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex-1 w-full flex items-center justify-center cursor-crosshair group my-auto min-h-0 py-2"
      >
        <div className="relative w-full max-w-4xl h-[420px] sm:h-[480px] md:h-[560px]">
          <SwarmCursor
            count={800}
            size={2.6}
            spread={90}
            swirl={0.6}
            clickEffect="burst"
            color="#FFAA55"
            accentColor="#FF5500"
            className="w-full h-full"
          >
            {/* Edge fades into pure black void */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none z-10" />
            
            {/* LAYER A: Base Artwork (Stippled figures and ridge) */}
            <div 
              className="absolute inset-0 w-full h-full bg-contain bg-center bg-no-repeat opacity-85 filter brightness-90 contrast-110 pointer-events-none transition-opacity duration-500"
              style={{ backgroundImage: `url(${heroArtwork})` }}
            />

            {/* LAYER B: Dynamic Torch Light on Hover (Brightens figures under the cursor) */}
            <div 
              className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-200"
              style={{
                opacity: mousePos.active ? 1 : 0,
                maskImage: `radial-gradient(circle 320px at ${mousePos.x}px ${mousePos.y}px, black 25%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(circle 320px at ${mousePos.x}px ${mousePos.y}px, black 25%, transparent 100%)`,
              }}
            >
              {/* Illuminated artwork layer */}
              <div 
                className="w-full h-full bg-contain bg-center bg-no-repeat filter brightness-150 contrast-160"
                style={{ backgroundImage: `url(${heroArtwork})` }}
              />
              
              {/* Ambient warm amber glow following the cursor */}
              <div 
                className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#FF6600]/30 rounded-full blur-3xl"
                style={{
                  left: mousePos.x,
                  top: mousePos.y,
                }}
              />
            </div>

            {/* Minimal Cursor Instruction */}
            <div className="absolute bottom-2 right-4 z-30 text-[10px] font-mono text-white/30 tracking-widest uppercase pointer-events-none flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
              <span>Hover to illuminate figures • Click to burst</span>
            </div>
          </SwarmCursor>
        </div>
      </div>

      {/* 2. Headline & Action Buttons (Pure, clean, confident row) */}
      <div className="relative z-20 shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2 pb-2">
        {/* Left: Stark Headline */}
        <div className="max-w-xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.08]">
            <span className="text-white block font-medium">Where builders connect</span>
            <span className="text-white/40 block font-light">the architecture</span>
            <span className="text-white/40 block font-light">they believe in</span>
          </h1>
        </div>

        {/* Right: Stark Action Buttons */}
        <div className="shrink-0 flex items-center gap-3">
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noreferrer"
            className="px-7 py-3 bg-white text-black text-xs font-mono uppercase tracking-widest font-semibold hover:bg-white/90 transition-all flex items-center gap-2 group"
          >
            <span>Enter Discord Guild</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>

          <div className="hidden sm:flex items-center gap-2 px-4 py-3 border border-white/15 text-xs font-mono text-white/70">
            <span className="text-[#FF5500]">$</span>
            <span>npx devupward</span>
          </div>
        </div>
      </div>

    </section>
  )
}
