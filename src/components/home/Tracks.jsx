import React, { useState } from 'react'
import { Cpu, Laptop, Layers, Code2, Flame } from 'lucide-react'
import { COMMUNITY_TRACKS } from '../../data/community'

const TRACK_ICONS = {
  ai: Cpu,
  frontend: Laptop,
  systems: Layers,
  oss: Code2,
}

export function Tracks() {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const visibleTracks = selectedFilter === 'all'
    ? COMMUNITY_TRACKS
    : COMMUNITY_TRACKS.filter((t) => t.id === selectedFilter)

  return (
    <section id="tracks" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#FF5500] font-bold">
            Focused Guilds
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
            Engineering Tracks & Channels
          </h2>
          <p className="text-gray-400 mt-2 max-w-xl text-sm sm:text-base">
            Join the exact guild matching your current tech stack and focus area.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
          {['all', 'ai', 'frontend', 'systems', 'oss'].map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
                selectedFilter === filter
                  ? 'bg-[#FF5500] text-white font-semibold shadow-md shadow-orange-950/40'
                  : 'bg-white/[0.03] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {filter === 'all' ? 'All Tracks' : filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleTracks.map((track) => {
          const Icon = TRACK_ICONS[track.id] || Code2
          return (
            <div 
              key={track.id} 
              className="rounded-2xl glass-panel p-7 glass-panel-hover transition-all duration-300 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-[#FF5500]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-gray-400 bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/5">
                    {track.memberCount} members
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{track.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{track.description}</p>
              </div>

              <div>
                <div className="mb-4 p-3 rounded-lg bg-black/40 border border-white/5 text-xs font-mono text-gray-300 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#FF5500] shrink-0" />
                  <span className="truncate">Active RFC: <span className="text-gray-400">{track.activeDiscussion}</span></span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {track.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.03] text-gray-400 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

