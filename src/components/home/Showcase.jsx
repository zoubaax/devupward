import React from 'react'
import { Star, ArrowRight, ExternalLink } from 'lucide-react'
import { COMMUNITY_PROJECTS } from '../../data/community'
import { SOCIAL_LINKS } from '../../data/navigation'

export function Showcase() {
  return (
    <section id="showcase" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#FF5500] font-bold">
            Built by Members
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
            Open-Source Showcase
          </h2>
          <p className="text-gray-400 mt-2 max-w-xl text-sm sm:text-base">
            Software, frameworks, and developer tools conceived and built by DevUpward contributors.
          </p>
        </div>
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noreferrer"
          className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-mono text-[#FF7722] hover:text-[#FFA040] transition-colors"
        >
          <span>View GitHub Organization</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COMMUNITY_PROJECTS.map((proj) => (
          <div 
            key={proj.title} 
            className="rounded-2xl glass-panel p-6 glass-panel-hover transition-all flex flex-col justify-between border border-white/10"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {proj.title}
                </h3>
                <div className="flex items-center gap-1 text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{proj.stars}</span>
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {proj.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.03] text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-gray-400 font-mono">
                <span>{proj.author}</span>
                <a 
                  href={SOCIAL_LINKS.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-[#FF5500] hover:text-[#FFA040] flex items-center gap-1 transition-colors"
                >
                  <span>Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

