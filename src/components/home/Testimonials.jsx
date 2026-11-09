import React from 'react'
import { TESTIMONIALS } from '../../data/community'
import SpotlightCard from '../reactbits/SpotlightCard'
import DecryptedText from '../reactbits/DecryptedText'
import { Quote } from 'lucide-react'

export function Testimonials() {
  return (
    <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/[0.08] bg-[#08090C]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FF5500] block mb-2">
            <DecryptedText text="DISPATCHES // 06" animateOn="view" speed={30} />
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
            Voices from the Mesh
          </h2>
        </div>
        <p className="text-white/50 text-xs sm:text-sm font-mono max-w-md">
          Feedback from builders who found co-founders and leveled up inside DevUpward.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((item, idx) => (
          <SpotlightCard
            key={idx}
            spotlightColor="rgba(255, 85, 0, 0.2)"
            className="rounded-xl border border-white/[0.08] hover:border-white/20 transition-all p-8 flex flex-col justify-between group bg-[#0C0D14]"
          >
            <div>
              <Quote className="w-5 h-5 text-[#FF5500]/60 mb-4" />
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-8 font-light">
                "{item.quote}"
              </p>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-mono font-medium text-white">{item.author}</h4>
                <p className="text-[10px] font-mono text-white/40">{item.role}</p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>VERIFIED</span>
              </span>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  )
}
