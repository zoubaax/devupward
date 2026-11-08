import React from 'react'
import { TESTIMONIALS } from '../../data/community'

export function Testimonials() {
  return (
    <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10 bg-[#000000]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FF5500] block mb-2">
            DISPATCHES // 05
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
            Voices from the Mesh
          </h2>
        </div>
        <p className="text-white/40 text-xs sm:text-sm font-mono max-w-md">
          Feedback from builders who found co-founders and leveled up inside DevUpward.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
        {TESTIMONIALS.map((item, idx) => (
          <div 
            key={idx} 
            className="bg-[#000000] p-8 flex flex-col justify-between hover:bg-white/[0.02] transition-colors"
          >
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-8 font-light">
              "{item.quote}"
            </p>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-mono font-medium text-white">{item.author}</h4>
                <p className="text-[10px] font-mono text-white/40">{item.role}</p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">VERIFIED</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
