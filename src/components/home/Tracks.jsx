import React, { useState } from 'react'
import { COMMUNITY_TRACKS } from '../../data/community'
import { ArrowUpRight } from 'lucide-react'

export function Tracks() {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const visibleTracks = selectedFilter === 'all'
    ? COMMUNITY_TRACKS
    : COMMUNITY_TRACKS.filter((t) => t.id === selectedFilter)

  return (
    <section id="tracks" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10 bg-[#000000]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FF5500] block mb-2">
            SPECIALIZED CHANNELS // 02
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
            Engineering Tracks
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {['all', 'ai', 'frontend', 'systems', 'oss'].map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider transition-all border ${
                selectedFilter === filter
                  ? 'bg-white text-black border-white font-semibold'
                  : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {filter === 'all' ? 'All Tracks' : filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
        {visibleTracks.map((track) => (
          <div 
            key={track.id} 
            className="bg-[#000000] p-8 sm:p-10 flex flex-col justify-between hover:bg-white/[0.02] transition-colors group"
          >
            <div>
              <div className="flex items-center justify-between mb-6 text-[11px] font-mono text-white/40">
                <span>{track.memberCount} BUILDERS</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white transition-colors" />
              </div>

              <h3 className="text-2xl font-normal text-white mb-3">
                {track.title}
              </h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light mb-8">
                {track.description}
              </p>
            </div>

            <div>
              <div className="mb-6 p-3 bg-white/[0.02] border border-white/10 text-[11px] font-mono text-white/70 flex items-center justify-between">
                <span className="text-[#FF5500]">ACTIVE RFC</span>
                <span className="text-white/50 truncate max-w-[280px]">{track.activeDiscussion}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {track.technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="text-[10px] font-mono px-2 py-0.5 border border-white/10 text-white/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
