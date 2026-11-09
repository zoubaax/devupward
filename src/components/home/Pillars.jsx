import React from 'react'
import { Rocket, Code2, Calendar, Users, ArrowUpRight } from 'lucide-react'
import SpotlightCard from '../reactbits/SpotlightCard'
import DecryptedText from '../reactbits/DecryptedText'

const PILLARS = [
  {
    num: '01',
    tag: 'VELOCITY',
    title: '48h Sprint Cycles',
    desc: 'Bi-weekly weekend build sprints with clear prompts. Form teams in Discord, ship working code on GitHub, and pitch live to community peers.',
    icon: Rocket,
  },
  {
    num: '02',
    tag: 'RIGOR',
    title: 'Brutal PR Reviews',
    desc: 'Uncompromising peer review circles. Get line-by-line feedback on memory safety, complexity, and systems architecture from staff engineers.',
    icon: Code2,
  },
  {
    num: '03',
    tag: 'SIGNAL',
    title: 'Architecture Vault',
    desc: 'No generic slide decks. Deep-dive masterclasses into production incident postmortems, distributed databases, and local AI inference engines.',
    icon: Calendar,
  },
  {
    num: '04',
    tag: 'MESH',
    title: 'Co-Founder Synthesis',
    desc: 'Pair with builders whose skills complement yours. 34 software ventures and open-source tools have been born inside DevUpward sprints.',
    icon: Users,
  },
]

export function Pillars() {
  return (
    <section id="pillars" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/[0.08] bg-[#08090C]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FF5500] block mb-2">
            <DecryptedText text="ARCHITECTURE // 01" animateOn="view" speed={30} />
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
            The Building Blocks of DevUpward
          </h2>
        </div>
        <p className="text-white/50 text-xs sm:text-sm font-mono max-w-md">
          A high-signal sanctuary engineered to replace isolation with intense collaborative execution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PILLARS.map((item) => {
          const Icon = item.icon
          return (
            <SpotlightCard
              key={item.num}
              spotlightColor="rgba(255, 85, 0, 0.28)"
              className="flex flex-col justify-between group rounded-xl border border-white/[0.08] hover:border-white/20 transition-all p-7 bg-[#0C0D14]"
            >
              <div>
                <div className="flex items-center justify-between mb-6 text-[11px] font-mono text-white/40">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-white/[0.03] border border-white/10 text-[#FF5500]">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span>{item.num} // {item.tag}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2.5 group-hover:text-[#FFAA55] transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/60 text-xs leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">STATUS: ACTIVE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            </SpotlightCard>
          )
        })}
      </div>
    </section>
  )
}
