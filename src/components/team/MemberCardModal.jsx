import React, { useState, useEffect, useRef, useCallback } from 'react'
import { TEAM_MEMBERS } from '../../data/teamMembers'
import { ArrowLeft, ArrowRight, RotateCw, X } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons'

function CardInner({ memberIndex, isFlipped, onToggleFlip, onSelectMember, onClose }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 })
  const [showLego, setShowLego] = useState(false)
  const cardRef = useRef(null)

  const member = TEAM_MEMBERS[memberIndex] || TEAM_MEMBERS[0]

  // 3D Tilt calculation on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -12
    const rotateY = ((x - centerX) / centerX) * 12
    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100

    setTilt({ rotateX, rotateY, glareX, glareY })
  }

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 })
  }

  const [firstName, ...restName] = member.name.split(' ')
  const lastName = restName.join(' ')
  const currentCount = String(memberIndex + 1).padStart(2, '0')
  const totalCount = String(TEAM_MEMBERS.length).padStart(2, '0')

  const themeClasses = {
    gold: 'card-theme-gold shadow-[0_0_50px_rgba(242,169,59,0.25)] border-[#f2a93b]/40',
    red: 'card-theme-red shadow-[0_0_50px_rgba(240,84,74,0.25)] border-[#f0584d]/40',
    teal: 'card-theme-teal shadow-[0_0_50px_rgba(46,196,176,0.25)] border-[#2ec4b0]/40',
    blue: 'card-theme-blue shadow-[0_0_50px_rgba(76,155,240,0.25)] border-[#4c9bf0]/40',
    violet: 'card-theme-violet shadow-[0_0_50px_rgba(154,110,240,0.25)] border-[#9a6ef0]/40',
  }

  const themeAccentColors = {
    gold: '#ffc95c',
    red: '#ff8273',
    teal: '#66f0d8',
    blue: '#82c4ff',
    violet: '#c6a6ff',
  }

  const accentColor = themeAccentColors[member.card.theme] || '#FF5500'

  return (
    <div className="relative z-10 flex flex-col items-center justify-center gap-6 max-h-[92vh]">
      {/* Holographic 3D Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onToggleFlip}
        className="relative w-[300px] sm:w-[350px] md:w-[370px] aspect-[72/100] cursor-pointer select-none perspective-1600 transition-transform duration-150 ease-out"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        }}
      >
        {/* Flipper Wrapper */}
        <div
          className={`w-full h-full relative transform-style-3d transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* ================= FRONT SIDE ================= */}
          <div
            className={`absolute inset-0 rounded-2xl overflow-hidden backface-hidden border ${
              themeClasses[member.card.theme]
            } bg-[#0C0D14] p-1 flex flex-col justify-between`}
          >
            {/* Dynamic Glare Overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay z-30 transition-opacity"
              style={{
                background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
              }}
            />

            {/* Background gradient & stipple mesh */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none" />

            {/* Top Header Information */}
            <div className="relative z-20 pt-4 px-5 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 block">
                  EDITION // {currentCount}
                </span>
                <span className="text-xs font-mono font-semibold" style={{ color: accentColor }}>
                  « {member.role.split('&')[0]} »
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-white/20 bg-[#08090C]/80 text-[9px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE</span>
              </div>
            </div>

            {/* Vertical Year Mark */}
            <div className="absolute right-3 top-1/3 z-20 text-[9px] font-mono text-white/30 uppercase tracking-[0.25em] [writing-mode:vertical-rl]">
              DEVUPWARD 2026 +
            </div>

            {/* Center Silhouette / LEGO Cutout */}
            <div className="relative z-10 w-full h-[62%] flex items-center justify-center overflow-hidden p-2">
              {showLego && member.legoImage ? (
                <img
                  src={member.legoImage}
                  alt={`${member.name} LEGO Star Wars Minifigure`}
                  className="max-h-[105%] w-auto object-contain filter contrast-105 drop-shadow-[0_20px_30px_rgba(0,0,0,0.95)] rounded-2xl select-none transition-transform duration-300"
                />
              ) : (
                <picture className="w-full h-full flex items-center justify-center drop-shadow-[0_20px_25px_rgba(0,0,0,0.9)]">
                  <source srcSet={member.image} type="image/webp" />
                  <img
                    src={member.fallback}
                    alt={member.name}
                    className="max-h-[110%] w-auto object-contain filter contrast-105 drop-shadow-2xl"
                  />
                </picture>
              )}
            </div>

            {/* Bottom Cyber Plate */}
            <div className="relative z-20 p-4 border-t border-white/[0.08] bg-[#08090C]/90 backdrop-blur-md rounded-b-xl">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-2xl font-mono font-bold tracking-tight text-white">
                  <span style={{ color: accentColor }}>[{firstName}</span>
                  <span className="text-white ml-2">{lastName}]</span>
                  <sup className="text-[10px] text-white/50 ml-1">®</sup>
                </h3>
                <span className="text-[10px] font-mono text-white/40">&lt;/&gt;</span>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-white/50 pt-2 border-t border-white/10">
                <span>Five minds. One vision.</span>
                <div className="w-16 h-3 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.7)_0_1px,transparent_1px_2px,rgba(255,255,255,0.7)_2px_4px,transparent_4px_6px)] opacity-60" />
              </div>
            </div>

            {/* Ambient Edge Glow */}
            <div
              className="absolute -inset-1 rounded-2xl opacity-20 blur-lg pointer-events-none -z-10"
              style={{ backgroundColor: accentColor }}
            />
          </div>

          {/* ================= BACK SIDE (FLIPPED) ================= */}
          <div
            className={`absolute inset-0 rounded-2xl overflow-hidden backface-hidden [transform:rotateY(180deg)] border ${
              themeClasses[member.card.theme]
            } bg-[#0C0D14] p-6 flex flex-col justify-between`}
          >
            {/* Back ambient lighting */}
            <div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: accentColor }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

            <div>
              {/* Header identity */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover object-top border border-white/20 bg-white/5"
                />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF5500]">
                    NODE // {currentCount}
                  </span>
                  <h3 className="text-lg font-mono font-bold text-white leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono text-white/60">{member.role}</p>
                </div>
              </div>

              {/* Biography / Intro */}
              <div className="py-4">
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                  {member.intro}
                </p>
              </div>

              {/* Skills Chips */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                  SPECIALIZATION &amp; STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-[10px] font-mono border border-white/15 bg-white/[0.04] text-white/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contribution */}
              <div className="pt-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block mb-1">
                  HACKATHON DELIVERABLES
                </span>
                <p className="text-xs text-white/70 font-mono leading-relaxed bg-white/[0.02] p-2.5 border border-white/5 rounded-md">
                  {member.contribution}
                </p>
              </div>
            </div>

            {/* Social and Footer links */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-2">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 py-2 rounded border border-white/20 bg-white/5 hover:bg-white text-white hover:text-black transition-colors text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 py-2 rounded border border-white/20 bg-white/5 hover:bg-white text-white hover:text-black transition-colors text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-white/40 pt-1">
                <span>DEVUPWARD GUILD</span>
                <span>CLICK TO FLIP FRONT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= DOCK NAVIGATION CONTROLS ================= */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.12] bg-[#08090C]/95 backdrop-blur-xl shadow-2xl z-30">
        {/* Previous Member */}
        <button
          type="button"
          onClick={() => onSelectMember((memberIndex - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length)}
          className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          aria-label="Previous member"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Counter */}
        <span className="text-xs font-mono font-semibold px-2 text-white/80 tabular-nums">
          {currentCount} / {totalCount}
        </span>

        {/* Next Member */}
        <button
          type="button"
          onClick={() => onSelectMember((memberIndex + 1) % TEAM_MEMBERS.length)}
          className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          aria-label="Next member"
        >
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-white/20 mx-1" />

        {/* Flip Toggle Button */}
        <button
          type="button"
          onClick={onToggleFlip}
          className="px-4 py-1.5 rounded-full bg-white text-black hover:bg-white/90 text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCw className={`w-3.5 h-3.5 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
          <span>{isFlipped ? 'Show Front' : 'Flip Details'}</span>
        </button>

        <div className="w-px h-4 bg-white/20 mx-1" />

        {/* LEGO Star Wars Asset Toggle */}
        <button
          type="button"
          onClick={() => setShowLego((prev) => !prev)}
          className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 border cursor-pointer ${
            showLego
              ? 'bg-amber-500/25 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
              : 'hover:bg-white/10 text-white/70 hover:text-white border-white/10'
          }`}
          title="Toggle LEGO Star Wars Minifigure Asset"
        >
          <span>🧱</span>
          <span>{showLego ? 'LEGO Active' : 'View LEGO'}</span>
        </button>

        <div className="w-px h-4 bg-white/20 mx-1" />

        {/* Close Modal */}
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Keyboard shortcut hint */}
      <div className="text-[11px] font-mono text-white/40 tracking-wider hidden sm:flex items-center gap-4">
        <span>[← / →] Navigate</span>
        <span>[Space / F] Flip</span>
        <span>[Esc] Close</span>
      </div>
    </div>
  )
}

export function MemberCardModal({ memberIndex, isOpen, onClose, onSelectMember }) {
  const [isFlipped, setIsFlipped] = useState(false)

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight') {
        setIsFlipped(false)
        onSelectMember((memberIndex + 1) % TEAM_MEMBERS.length)
      } else if (e.key === 'ArrowLeft') {
        setIsFlipped(false)
        onSelectMember((memberIndex - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length)
      } else if (e.key === ' ' || e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        setIsFlipped((prev) => !prev)
      }
    },
    [isOpen, memberIndex, onClose, onSelectMember]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!isOpen) return null

  const handleSelectMember = (newIndex) => {
    setIsFlipped(false)
    onSelectMember(newIndex)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6 bg-[#08090C]/90 backdrop-blur-md transition-opacity duration-300">
      {/* Background click to close */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 cursor-zoom-out" 
        aria-hidden="true" 
      />

      <CardInner
        key={memberIndex}
        memberIndex={memberIndex}
        isFlipped={isFlipped}
        onToggleFlip={() => setIsFlipped((prev) => !prev)}
        onSelectMember={handleSelectMember}
        onClose={onClose}
      />
    </div>
  )
}
