import React from 'react'
import { COMMUNITY_PROJECTS } from '../../data/community'
import { ArrowUpRight, Star, GitBranch } from 'lucide-react'
import { SOCIAL_LINKS } from '../../data/navigation'
import SpotlightCard from '../reactbits/SpotlightCard'
import DecryptedText from '../reactbits/DecryptedText'

export function Showcase() {
  return (
    <section id="showcase" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/[0.08] bg-[#08090C]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FF5500] block mb-2">
            <DecryptedText text="PROOF OF WORK // 04" animateOn="view" speed={30} />
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
            Shipped by Community Nodes
          </h2>
        </div>
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-mono uppercase tracking-wider text-white/50 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <span>Explore GitHub Registry</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {COMMUNITY_PROJECTS.map((proj) => (
          <SpotlightCard
            key={proj.title}
            spotlightColor="rgba(255, 85, 0, 0.22)"
            className="rounded-xl border border-white/[0.08] hover:border-white/20 transition-all p-8 flex flex-col justify-between group bg-[#0C0D14]"
          >
            <div>
              <div className="flex items-center justify-between mb-6 text-[11px] font-mono text-white/40">
                <span className="flex items-center gap-1 text-[#FFAA55]">
                  <Star className="w-3 h-3 fill-[#FFAA55]" />
                  <span>{proj.stars} STARS</span>
                </span>
                <span className="text-white/40">{proj.author}</span>
              </div>

              <h3 className="text-xl font-normal text-white mb-2 group-hover:text-[#FFAA55] transition-colors">
                {proj.title}
              </h3>
              <p className="text-white/60 text-xs leading-relaxed font-light mb-8">
                {proj.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {proj.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 border border-white/10 text-white/50 rounded-sm bg-white/[0.02]">
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 border border-white/10 hover:border-white/30 text-white/70 hover:text-white text-[11px] font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors rounded-sm bg-white/[0.02]"
              >
                <GitBranch className="w-3 h-3 text-[#FF5500]" />
                <span>Inspect Repository</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  )
}
