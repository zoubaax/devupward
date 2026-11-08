import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { SOCIAL_LINKS } from '../../data/navigation'
import { InteractivePointCloud } from './InteractivePointCloud'

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
    <section className="relative w-full min-h-screen bg-[#000000] text-white flex flex-col justify-between pt-24 pb-12 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* 1. Dynamic Torch / Illumination Visual */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full flex items-center justify-center pt-2 sm:pt-4 pb-4 select-none cursor-crosshair group"
      >
        <div className="relative w-full max-w-4xl mx-auto h-[340px] sm:h-[440px] md:h-[500px]">
          
          {/* Subtle edge fades into pure black void */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none z-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none z-20" />
          
          {/* LAYER A: Dimmed Idle Base (The 2 people rest in dark shadow) */}
          <img 
            src="/dither-hero.jpg" 
            alt="DevUpward - Shadow Base" 
            className="absolute inset-0 w-full h-full object-contain object-center opacity-30 filter brightness-60 contrast-125 pointer-events-none transition-opacity duration-500"
          />

          {/* LAYER B: Dynamic Torch Light (Expanded radius & boosted brightness) */}
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-200"
            style={{
              opacity: mousePos.active ? 1 : 0,
              maskImage: `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, black 25%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, black 25%, transparent 100%)`,
            }}
          >
            <img 
              src="/dither-hero.jpg" 
              alt="DevUpward - Illuminated Torch" 
              className="w-full h-full object-contain object-center filter brightness-150 contrast-160"
            />
            {/* Ambient warm amber glow following the cursor */}
            <div 
              className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FF6600]/35 rounded-full blur-3xl"
              style={{
                left: mousePos.x,
                top: mousePos.y,
              }}
            />
          </div>

          {/* LAYER C: Interactive Point Cloud Canvas with particle lighting */}
          <div className="relative z-30 w-full h-full pointer-events-none">
            <InteractivePointCloud />
          </div>

          {/* Minimal Cursor Instruction */}
          <div className="absolute bottom-2 right-4 z-30 text-[10px] font-mono text-white/30 tracking-widest uppercase pointer-events-none flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
            <span>Hover to illuminate figures</span>
          </div>

        </div>
      </div>

      {/* 2. Middle Row: Typography (Left) & Action Button (Right) */}
      <div className="relative z-20 flex flex-col md:flex-row md:items-end justify-between gap-8 pt-4 pb-10">
        {/* Left: Stark Headline */}
        <div className="max-w-xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.08]">
            <span className="text-white block font-medium">Where builders connect</span>
            <span className="text-white/40 block font-light">the architecture</span>
            <span className="text-white/40 block font-light">they believe in</span>
          </h1>
        </div>

        {/* Right: Stark Action Buttons */}
        <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3.5 bg-white text-black text-xs font-mono uppercase tracking-widest font-semibold rounded-none hover:bg-white/90 transition-all flex items-center gap-2 group"
          >
            <span>Enter Discord Guild</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>

          <div className="flex items-center gap-2 px-4 py-3.5 border border-white/15 text-xs font-mono text-white/70">
            <span className="text-[#FF5500]">$</span>
            <span>npx devupward</span>
          </div>
        </div>
      </div>

      {/* 3. Bottom 4-Column Minimal Data Matrix */}
      <div className="relative z-20 pt-8 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-[11px] font-mono leading-relaxed tracking-wider">
          
          {/* Column 1 */}
          <div>
            <h4 className="text-white/40 uppercase mb-3 text-[10px]">SYSTEM / TRACKS</h4>
            <ul className="space-y-1.5 text-white/80">
              <li className="hover:text-white transition-colors cursor-default">Autonomous AI Agents</li>
              <li className="hover:text-white transition-colors cursor-default">Distributed Engines (Rust/Go)</li>
              <li className="hover:text-white transition-colors cursor-default">Frontend Architecture</li>
              <li className="hover:text-white transition-colors cursor-default">Open Source Labs</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white/40 uppercase mb-3 text-[10px]">ENGAGEMENT</h4>
            <ul className="space-y-1.5 text-white/80">
              <li className="hover:text-white transition-colors cursor-default">48h Weekend Sprints</li>
              <li className="hover:text-white transition-colors cursor-default">Unfiltered PR Reviews</li>
              <li className="hover:text-white transition-colors cursor-default">Live Architecture Roasts</li>
              <li className="hover:text-white transition-colors cursor-default">Technical Co-founder Mesh</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white/40 uppercase mb-3 text-[10px]">COMMUNITY</h4>
            <ul className="space-y-1.5 text-white/80">
              <li className="hover:text-white transition-colors cursor-default">2,800+ Active Nodes</li>
              <li className="hover:text-white transition-colors cursor-default">Zero Gatekeeping</li>
              <li className="hover:text-white transition-colors cursor-default">Proof of Work</li>
              <li className="hover:text-white transition-colors cursor-default">100% Free & Open</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-white/40 uppercase mb-3 text-[10px]">MESH ACCESS</h4>
            <ul className="space-y-1.5 text-white/80">
              <li>
                <a href={SOCIAL_LINKS.discord} target="_blank" rel="noreferrer" className="text-white hover:text-[#FF8833] transition-colors flex items-center gap-1">
                  <span>Discord Gateway</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  GitHub Organization
                </a>
              </li>
              <li className="hover:text-white transition-colors cursor-default">Sprint #08 Active</li>
              <li className="text-white/50 cursor-default">Latencies: 18ms global</li>
            </ul>
          </div>

        </div>

        {/* Sub-Footer Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-white/40">
          <span>© 2026 DEVUPWARD. BUILDING WHAT'S NEXT.</span>
          <span className="mt-2 sm:mt-0">TRANSCEND THE ORDINARY.</span>
        </div>
      </div>

    </section>
  )
}
