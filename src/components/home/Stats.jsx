import React from 'react'
import { COMMUNITY_STATS } from '../../data/community'

export function Stats() {
  return (
    <section className="border-y border-white/[0.08] bg-black/40 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {COMMUNITY_STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-gray-200 mt-1">
                {stat.label}
              </span>
              <span className="text-xs text-[#FF7722] font-mono mt-0.5">
                {stat.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

