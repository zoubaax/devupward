import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { TEAM_MEMBERS, PARALLAX_DEPTH, MEMBER_ENTRANCES } from '../../data/teamMembers'
import { Sparkles } from 'lucide-react'

export function TeamStage({ onSelectMember }) {
  const stageRef = useRef(null)
  const memberRefs = useRef([])
  const parallaxMovers = useRef([])
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    // Initialize parallax movers using gsap.quickTo for instant 60/120fps tracking
    parallaxMovers.current = memberRefs.current.map((el, index) => {
      if (!el) return null
      const member = TEAM_MEMBERS[index]
      const depth = PARALLAX_DEPTH[member.slot] ?? 0
      return {
        depth,
        x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power2.out' }),
        y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power2.out' }),
      }
    })

    // Staggered entrance animation for all 5 builders
    memberRefs.current.forEach((el, index) => {
      if (!el) return
      const member = TEAM_MEMBERS[index]
      const entrance = MEMBER_ENTRANCES[member.slot]
      gsap.fromTo(
        el,
        {
          y: entrance.y,
          opacity: 0,
          scale: entrance.scale,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: entrance.duration,
          delay: 0.2 + index * 0.1,
          ease: 'power3.out',
        }
      )
    })
  }, [])

  const handlePointerMove = (e) => {
    const el = stageRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const normalX = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2))
    const normalY = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2))

    parallaxMovers.current.forEach((mover) => {
      if (mover) {
        mover.x(normalX * mover.depth * 3)
        mover.y(normalY * mover.depth * 2)
      }
    })
  }

  const handlePointerLeave = () => {
    parallaxMovers.current.forEach((mover) => {
      if (mover) {
        mover.x(0)
        mover.y(0)
      }
    })
    setHoveredIndex(null)
  }

  // Positioning classes corresponding to each builder's seat
  const slotStyles = {
    'back-left': 'left-[16%] sm:left-[22%] bottom-[20%] z-10 w-[36%]',
    'back-right': 'left-[68%] sm:left-[72%] bottom-[20%] z-10 w-[32%]',
    'center': 'left-[32%] sm:left-[35%] bottom-[23%] z-40 w-[33%]',
    'front-left': 'left-[5%] sm:left-[9%] bottom-[28%] z-30 w-[29%]',
    'front-right': 'left-[60%] sm:left-[64%] bottom-[28%] z-30 w-[29%]',
  }

  return (
    <div
      ref={stageRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative w-full aspect-[657/552] max-h-[680px] mx-auto select-none overflow-visible group"
    >
      {/* 1. Ambient Warmth / Orange Cyber Aura */}
      <div className="absolute inset-x-[5%] top-[10%] h-[75%] rounded-full bg-gradient-to-b from-[#FF5500]/20 via-[#FF7700]/10 to-transparent blur-3xl pointer-events-none" />

      {/* 2. Technical Vector Backdrop */}
      <div className="absolute left-[8%] top-[2%] w-[84%] pointer-events-none opacity-40 mix-blend-screen">
        <img
          src="/assets/team/devupward-team-background.svg"
          alt=""
          width="1600"
          height="850"
          className="w-full h-auto object-contain filter invert contrast-200"
        />
      </div>

      {/* 3. The 5 Interactive Builders */}
      {TEAM_MEMBERS.map((member, idx) => {
        const isHovered = hoveredIndex === idx
        const isDimmed = hoveredIndex !== null && !isHovered

        return (
          <button
            key={member.id}
            type="button"
            onClick={() => onSelectMember(idx)}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`absolute block p-0 border-0 bg-transparent text-inherit cursor-pointer transform-origin-bottom transition-opacity duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500] ${
              slotStyles[member.slot]
            } ${isDimmed ? 'opacity-40' : 'opacity-100'}`}
            aria-label={`${member.name} — ${member.role}`}
          >
            <div
              ref={(el) => (memberRefs.current[idx] = el)}
              className="relative w-full h-full transform-origin-bottom transition-transform duration-200 ease-out hover:scale-[1.03]"
            >
              {/* Member Portrait Picture */}
              <picture className="relative block w-full h-auto drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)]">
                <source srcSet={member.image} type="image/webp" />
                <img
                  src={member.fallback}
                  alt={member.name}
                  width={member.width}
                  height={member.height}
                  className="w-full h-auto object-contain select-none filter contrast-105"
                  loading="lazy"
                />
              </picture>

              {/* Hover Badge Pill (Cyber-noir styled) */}
              <div
                className={`absolute left-1/2 -top-6 -translate-x-1/2 px-3 py-1 rounded-full border border-white/[0.12] bg-[#0C0D14]/95 backdrop-blur-md text-[11px] font-mono whitespace-nowrap text-white flex items-center gap-1.5 shadow-xl transition-all duration-200 pointer-events-none z-50 ${
                  isHovered ? 'opacity-100 scale-100 -translate-y-2' : 'opacity-0 scale-95 translate-y-0'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
                <span className="font-semibold text-white">{member.name}</span>
                <span className="text-white/40">//</span>
                <span className="text-xs text-[#FFAA55] font-light">{member.role.split('&')[0]}</span>
              </div>
            </div>
          </button>
        )
      })}

      {/* 4. Collaborative Desk Workspace */}
      <div className="absolute left-[2%] bottom-0 w-[96%] z-20 pointer-events-none">
        <div className="relative w-full">
          {/* Ambient Desk Glow */}
          <div className="absolute inset-x-[10%] -bottom-4 h-24 rounded-full bg-gradient-to-t from-[#FF5500]/40 via-[#FF7700]/15 to-transparent blur-2xl" />

          {/* Desk Picture */}
          <picture className="relative z-10 block w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
            <source srcSet="/assets/team/desk.webp" type="image/webp" />
            <img
              src="/assets/team/desk.png"
              alt="DevUpward Team Collaborative Desk"
              width="1672"
              height="941"
              className="w-full h-auto object-contain filter contrast-110 brightness-95"
              loading="lazy"
            />
          </picture>

          {/* Ambient Sweep Lighting Beam across desk surface */}
          <div className="absolute inset-0 z-20 overflow-hidden mix-blend-screen pointer-events-none [mask-image:url('/assets/team/desk.webp')] [mask-size:100%_100%] [mask-repeat:no-repeat]">
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent desk-sweep-animate" />
          </div>
        </div>
      </div>

      {/* Hint overlay */}
      <div className="absolute bottom-2 right-4 z-30 hidden sm:flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase tracking-widest bg-[#0C0D14]/80 px-3 py-1.5 border border-white/[0.08] backdrop-blur-sm rounded-md">
        <Sparkles className="w-3 h-3 text-[#FF5500]" />
        <span>Click builder to inspect node profile</span>
      </div>
    </div>
  )
}

