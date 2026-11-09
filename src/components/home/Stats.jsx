import React from 'react'
import { COMMUNITY_STATS } from '../../data/community'

export function Stats() {
  return (
    <section className="border-y border-white/[0.08] bg-[#0A0B10] relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {COMMUNITY_STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-normal text-white font-mono tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-white/50 mt-1">
                {stat.label}
              </span>
              <span className="text-[10px] text-[#FF5500] font-mono mt-0.5">
                // {stat.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
