import React from 'react'
import { ArrowRight } from 'lucide-react'
import { SOCIAL_LINKS } from '../../data/navigation'

export function CtaBanner() {
  return (
    <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10 bg-[#000000]">
      <div className="border border-white/10 p-10 sm:p-16 relative overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
        
        {/* Subtle orange accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500] to-transparent opacity-80" />

        <div className="max-w-2xl">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FF5500] block mb-3">
            INITIALIZE // 07
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white mb-4 leading-tight">
            Stop coding in isolation.
          </h2>
          <p className="text-white/60 text-xs sm:text-sm font-mono mb-8 leading-relaxed">
            Join 2,800+ builders worldwide. Ship open-source code, get PR reviews, and build what's next.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href={SOCIAL_LINKS.discord}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 bg-white text-black text-xs font-mono uppercase tracking-widest font-semibold hover:bg-white/90 transition-all flex items-center gap-2 group"
            >
              <span>Enter Discord Sanctuary</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="px-5 py-3.5 border border-white/15 text-xs font-mono text-white/60">
              <span className="text-[#FF5500]">$</span> npx devupward join
            </div>
          </div>
        </div>

        {/* Ambient background watermark mark */}
        <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none hidden md:block">
          <img src="/logo.png" alt="DevUpward" className="h-64 w-auto object-contain" />
        </div>
      </div>
    </section>
  )
}
