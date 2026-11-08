import React from 'react'
import { ArrowRight } from 'lucide-react'
import { DiscordIcon, GithubIcon } from '../common/BrandIcons'
import { SOCIAL_LINKS } from '../../data/navigation'

export function CtaBanner() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#FF5500]/30 p-8 sm:p-14 text-center shadow-2xl shadow-orange-950/40">
        
        {/* Ambient Glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF5500]/15 via-[#FF5500]/5 to-transparent pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF5500]/25 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Logo center mark */}
          <div className="flex justify-center mb-6">
            <img 
              src="/logo.png" 
              alt="DevUpward" 
              className="h-14 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(255,85,0,0.4)]" 
            />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Stop Building In Isolation.
          </h2>
          <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
            Join thousands of curious software engineers, discover your next favorite project, 
            and build what's next with DevUpward today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={SOCIAL_LINKS.discord}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-white font-semibold text-sm shadow-xl shadow-orange-950/60 overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF5500] via-[#FF6611] to-[#E64400]" />
              <DiscordIcon className="w-4 h-4 relative z-10" />
              <span className="relative z-10 tracking-wide">Get Free Invite</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-200 font-mono text-xs sm:text-sm transition-all"
            >
              <GithubIcon className="w-4 h-4 text-gray-300" />
              <span>Explore GitHub</span>
            </a>
          </div>
          
          <p className="text-xs text-gray-500 font-mono mt-6">
            Instant Discord Access • Zero Spam • Open to All Engineers
          </p>
        </div>
      </div>
    </section>
  )
}

