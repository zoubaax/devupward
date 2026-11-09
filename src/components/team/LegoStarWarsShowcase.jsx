import React, { useState } from 'react'
import { TEAM_MEMBERS } from '../../data/teamMembers'
import { arcadeAudio } from '../../utils/arcadeAudio'
import { Lego3DViewer } from './Lego3DViewer'
import { Sparkles, Shield, Cpu, Cloud, Palette, GitBranch, ExternalLink, Move3d } from 'lucide-react'

const STAR_WARS_CLASSES = [
  {
    title: 'JEDI AI ARCHITECT',
    faction: 'Neural Order',
    weapon: 'Amber Holocron Cube',
    aura: '#F59E0B',
    icon: Cpu
  },
  {
    title: 'CLOUD FLEET COMMANDER',
    faction: 'Infra Vanguard',
    weapon: 'Sub-space Datapad',
    aura: '#EF4444',
    icon: Cloud
  },
  {
    title: 'HOLOGRAPHIC UI MASTER',
    faction: 'Design Enclave',
    weapon: 'Light-Grid Projector',
    aura: '#14B8A6',
    icon: Palette
  },
  {
    title: 'OPEN-SOURCE SHIPWRIGHT',
    faction: 'Hyperdrive Core',
    weapon: 'Hydrospanner & Terminal',
    aura: '#3B82F6',
    icon: GitBranch
  },
  {
    title: 'KYBER VAULT GUARDIAN',
    faction: 'Zero-Knowledge Bastion',
    weapon: 'Encrypted Kyber Pod',
    aura: '#A855F7',
    icon: Shield
  }
]

export function LegoStarWarsShowcase({ onSelectMember }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [displayMode, setDisplayMode] = useState('3d') // '3d' | 'render'
  const currentMember = TEAM_MEMBERS[activeIdx]
  const currentClass = STAR_WARS_CLASSES[activeIdx]
  const Icon = currentClass.icon

  const handleSelect = (idx) => {
    arcadeAudio.playCoin()
    setActiveIdx(idx)
  }

  return (
    <div className="w-full rounded-2xl border border-white/[0.08] bg-[#0C0D14] p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden shadow-2xl">
      
      {/* Top LEGO Star Wars HUD Bar: "TRUE BUILDER" Meter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-base shadow-sm">
            🧱
          </div>
          <div>
            <h3 className="text-sm font-mono font-bold tracking-wider text-white uppercase flex items-center gap-2">
              <span>LEGO® STAR WARS™ ROSTER</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                3D COLLECTOR'S EDITION
              </span>
            </h3>
            <p className="text-xs font-mono text-white/40">
              Interactive 3D Minifigures with glossy ABS shaders, custom weapons & 360° rotation
            </p>
          </div>
        </div>

        {/* True Builder Progress Bar + 3D / 2D Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-0.5 rounded-xl border border-white/10 bg-[#08090C] text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setDisplayMode('3d')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                displayMode === '3d'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shadow-sm'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Move3d className="w-3.5 h-3.5" />
              <span>3D Model</span>
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode('render')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                displayMode === 'render'
                  ? 'bg-white/15 text-white font-bold'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <span>Render Art</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3 bg-[#08090C] px-3.5 py-1.5 rounded-xl border border-white/10">
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 font-bold">
              <span className="animate-spin text-sm">🪙</span>
              <span>TRUE BUILDER</span>
            </div>
            <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden relative">
              <div className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 w-full animate-pulse" />
            </div>
            <span className="text-[11px] font-mono font-bold text-white tracking-widest">
              100%
            </span>
          </div>
        </div>
      </div>

      {/* Main Roster Layout: Featured 3D Minifigure Holo-Pod + Selection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: 3D Minifigure Stage or Macro Render */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <div className="relative rounded-2xl bg-[#08090C] border border-white/[0.06] overflow-hidden min-h-[440px] flex items-center justify-center">
            {displayMode === '3d' ? (
              <Lego3DViewer key={activeIdx} memberIndex={activeIdx} />
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
                <div
                  className="absolute -top-12 inset-x-12 h-64 rounded-full blur-3xl opacity-25 pointer-events-none transition-colors duration-500"
                  style={{ backgroundColor: currentClass.aura }}
                />

                <div className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center my-4">
                  <img
                    src={currentMember.legoImage}
                    alt={`${currentMember.name} LEGO Star Wars Minifigure`}
                    className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.95)] select-none rounded-xl"
                  />
                </div>

                <div className="relative w-48 sm:w-64 h-6 mt-[-10px] z-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="w-full h-full rounded-[100%] border-2 opacity-80 animate-pulse"
                    style={{
                      borderColor: currentClass.aura,
                      boxShadow: `0 0 25px ${currentClass.aura}`
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Equipment Bar */}
          <div className="p-3 rounded-xl border border-white/[0.06] bg-[#08090C] flex items-center justify-between text-xs font-mono text-white/60">
            <div className="flex items-center gap-2">
              <Icon className="w-3.5 h-3.5" style={{ color: currentClass.aura }} />
              <span className="text-[11px] text-white font-medium">{currentClass.weapon}</span>
            </div>
            <button
              type="button"
              onClick={() => onSelectMember(activeIdx)}
              className="text-[11px] font-mono text-amber-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer group"
            >
              <span>Inspect Dossier</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Character Selection Grid (Iconic LEGO Star Wars Character Tokens) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs font-mono text-white/50 pb-2">
            <span className="uppercase tracking-wider">SELECT BUILDER MINIFIGURE:</span>
            <span>{activeIdx + 1} / {TEAM_MEMBERS.length} AVAILABLE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-1 gap-2.5">
            {TEAM_MEMBERS.map((member, idx) => {
              const isSelected = idx === activeIdx
              const sClass = STAR_WARS_CLASSES[idx]
              return (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className={`w-full p-3 rounded-xl border text-left transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer group ${
                    isSelected
                      ? 'bg-white/[0.07] border-white/30 shadow-lg'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/15'
                  }`}
                  style={isSelected ? { borderColor: `${sClass.aura}80` } : {}}
                >
                  {/* Minifigure Avatar Thumbnail */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`relative w-12 h-12 rounded-lg overflow-hidden border p-0.5 bg-[#08090C] flex-shrink-0 transition-transform ${
                        isSelected ? 'scale-105' : 'group-hover:scale-105'
                      }`}
                      style={{ borderColor: isSelected ? sClass.aura : 'rgba(255,255,255,0.1)' }}
                    >
                      <img
                        src={member.legoImage}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>

                    <div>
                      <h4 className="text-xs font-mono font-bold text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                        <span>{member.name}</span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sClass.aura }} />
                        )}
                      </h4>
                      <p className="text-[10px] font-mono text-white/50">
                        {sClass.title}
                      </p>
                    </div>
                  </div>

                  {/* Faction pill */}
                  <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-white/40 group-hover:text-white/80">
                    <span>{sClass.faction}</span>
                    <span className="text-xs">→</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Selected Character Bio Summary */}
          <div className="p-4 rounded-xl border border-white/[0.06] bg-[#08090C] text-xs font-mono text-white/70 space-y-2">
            <div className="flex items-center justify-between text-white text-[11px] font-bold">
              <span className="text-amber-400 uppercase tracking-wider">SPECIALIZATION & LORE</span>
              <span className="text-white/40">{currentMember.skills.slice(0, 3).join(' • ')}</span>
            </div>
            <p className="text-white/60 leading-relaxed text-[11px]">
              {currentMember.contribution}
            </p>
          </div>
        </div>

      </div>

      {/* Footer Hint */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/40">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Click and drag to rotate the 3D LEGO Minifigure in 360°</span>
        </div>
        <span>DEVUPWARD × LEGO STAR WARS 3D 2026</span>
      </div>

    </div>
  )
}

