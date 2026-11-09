import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ArrowUpRight, Cpu } from 'lucide-react'

export function StudioPod({ onTrigger }) {
  const containerRef = useRef(null)
  const floatRef = useRef(null)
  const streakRef = useRef(null)

  useEffect(() => {
    const floatEl = floatRef.current
    if (!floatEl) return

    // Gentle floating motion
    const floatTween = gsap.to(floatEl, {
      y: -14,
      duration: 3.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      force3D: true,
    })

    return () => {
      floatTween.kill()
    }
  }, [])

  const handlePointerMove = (e) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    gsap.to(floatRef.current, {
      x: x * -16,
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.6,
      ease: 'power2.out',
    })

    if (streakRef.current) {
      gsap.to(streakRef.current, {
        opacity: 0.8,
        scale: 1.1,
        duration: 0.3,
      })
    }
  }

  const handlePointerLeave = () => {
    gsap.to(floatRef.current, {
      x: 0,
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'power2.out',
    })

    if (streakRef.current) {
      gsap.to(streakRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.5,
      })
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative flex flex-col items-center justify-center p-6 border border-white/[0.08] bg-[#0C0D14] rounded-xl overflow-hidden group select-none"
    >
      {/* Background ambient grid & lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#FF5500_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#FF5500]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Terminal Tag */}
      <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-[11px] font-mono text-white/40">
        <div className="flex items-center gap-1.5 text-[#FF5500]">
          <Cpu className="w-3.5 h-3.5" />
          <span className="uppercase tracking-widest font-semibold">HACKATHON STUDIO POD</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ONLINE
        </span>
      </div>

      {/* Floating Pod Container */}
      <div 
        ref={floatRef}
        onClick={onTrigger}
        className="relative cursor-pointer py-4 flex flex-col items-center transition-transform"
      >
        {/* Glow Streak Aura behind Pod */}
        <div 
          ref={streakRef}
          className="absolute inset-0 -m-4 bg-gradient-to-t from-[#FF5500]/25 via-[#FFAA55]/10 to-transparent rounded-full blur-2xl opacity-0 transition-opacity pointer-events-none" 
        />

        {/* 3D Pod Image */}
        <picture className="relative z-10 block max-w-[280px] sm:max-w-[340px] drop-shadow-[0_20px_30px_rgba(255,85,0,0.2)]">
          <source srcSet="/assets/pod/hackathon-studio-pod.webp" type="image/webp" />
          <img
            src="/assets/pod/hackathon-studio-pod.png"
            alt="DevUpward Floating Hackathon Studio Pod"
            width="1124"
            height="854"
            className="w-full h-auto object-contain filter contrast-105"
            loading="lazy"
          />
        </picture>

        {/* Cue Pill */}
        <button
          type="button"
          onClick={onTrigger}
          className="mt-3 px-5 py-2 rounded-full border border-white/20 bg-[#08090C] hover:bg-white text-white hover:text-black text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center gap-2 shadow-lg group-hover:border-[#FF5500] group-hover:shadow-[0_0_20px_rgba(255,85,0,0.3)]"
        >
          <span>Meet the Builders</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#FF5500] group-hover:text-black transition-colors" />
        </button>
      </div>

      {/* Pod Telemetry info */}
      <div className="w-full pt-3 mt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
        <span>STATION // 01</span>
        <span>AUTONOMOUS POD</span>
      </div>
    </div>
  )
}

