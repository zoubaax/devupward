import React, { useState, Suspense, lazy } from 'react'
import { TeamStage } from './TeamStage'
import { StudioPod } from './StudioPod'
import { MemberCardModal } from './MemberCardModal'
import { TEAM_MEMBERS } from '../../data/teamMembers'
import { Terminal, Users, Loader2 } from 'lucide-react'
import DecryptedText from '../reactbits/DecryptedText'

const LegoStarWarsShowcase = lazy(() =>
  import('./LegoStarWarsShowcase').then((mod) => ({ default: mod.LegoStarWarsShowcase }))
)

export function TeamSection() {
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [stageMode, setStageMode] = useState('lego') // 'lego' | 'desk'

  const handleOpenMember = (index) => {
    setSelectedMemberIndex(index)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section id="team" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/[0.08] bg-[#08090C] relative">

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FF5500] block mb-2">
            <DecryptedText text="ENGINEERING CREW // 03" animateOn="view" speed={30} />
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white flex items-center gap-3">
            <span>Meet the Builders</span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono">
              LEGO® STAR WARS™
            </span>
          </h2>
        </div>

        {/* Edition Switcher */}
        <div className="flex items-center gap-2 p-1 rounded-xl border border-white/10 bg-[#0C0D14] text-xs font-mono">
          <button
            type="button"
            onClick={() => setStageMode('lego')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${stageMode === 'lego'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold shadow-sm'
                : 'text-white/50 hover:text-white'
              }`}
          >
            <span>🧱</span>
            <span>LEGO® Star Wars</span>
          </button>
          <button
            type="button"
            onClick={() => setStageMode('desk')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${stageMode === 'desk'
                ? 'bg-white/15 text-white font-semibold shadow-sm'
                : 'text-white/50 hover:text-white'
              }`}
          >
            <span>🏢</span>
            <span>Studio Desk</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left / Main Column */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {stageMode === 'lego' ? (
            <Suspense
              fallback={
                <div className="w-full min-h-[460px] rounded-2xl border border-white/[0.08] bg-[#0C0D14] flex flex-col items-center justify-center gap-3 text-white/50 font-mono text-xs">
                  <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
                  <span>INITIALIZING 3D LEGO® STAR WARS™ ROSTER...</span>
                </div>
              }
            >
              <LegoStarWarsShowcase onSelectMember={handleOpenMember} />
            </Suspense>
          ) : (
            <div className="border border-white/[0.08] bg-[#0C0D14] p-6 sm:p-10 relative overflow-hidden flex flex-col justify-between min-h-[500px] rounded-2xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs font-mono text-white/50">
                <div className="flex items-center gap-2 text-white">
                  <Users className="w-4 h-4 text-[#FF5500]" />
                  <span className="uppercase tracking-wider font-semibold">COLLABORATIVE WORKSPACE</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>5 NODES SYNCED</span>
                </div>
              </div>

              <div className="w-full my-auto">
                <TeamStage onSelectMember={handleOpenMember} />
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-white/40">
                <div className="flex items-center gap-3">
                  {TEAM_MEMBERS.map((m, idx) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleOpenMember(idx)}
                      className="hover:text-[#FFAA55] transition-colors cursor-pointer"
                    >
                      [{m.name.split(' ')[0]}]
                    </button>
                  ))}
                </div>
                <span>HOVER FOR DEPTH // CLICK TO INSPECT</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Floating Studio Pod + Quick Launch */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <StudioPod onTrigger={() => handleOpenMember(0)} />

          {/* Quick Roster Box */}
          <div className="p-6 border border-white/[0.08] bg-[#0C0D14] space-y-4 rounded-xl">
            <div className="flex items-center gap-2 pb-3 border-b border-white/[0.08] text-xs font-mono uppercase tracking-wider text-white">
              <Terminal className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>CREW ROSTER MANIFEST</span>
            </div>

            <div className="space-y-2">
              {TEAM_MEMBERS.map((member, idx) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => handleOpenMember(idx)}
                  className="w-full text-left p-2.5 rounded border border-white/5 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={member.legoImage}
                      alt={member.name}
                      className="w-7 h-7 rounded object-cover border border-white/10"
                    />
                    <div>
                      <h4 className="text-xs font-mono font-medium text-white group-hover:text-[#FFAA55] transition-colors">
                        {member.name}
                      </h4>
                      <p className="text-[10px] font-mono text-white/40">
                        {member.role.split('&')[0]}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-white/30 group-hover:text-white transition-colors">
                    0{idx + 1} ↗
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 3D Holographic Card Modal */}
      <MemberCardModal
        memberIndex={selectedMemberIndex}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectMember={setSelectedMemberIndex}
      />

    </section>
  )
}

