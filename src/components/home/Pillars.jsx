import React from 'react'
import { Rocket, Code2, Calendar, Users, CheckCircle2 } from 'lucide-react'

export function Pillars() {
  return (
    <section id="pillars" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase font-mono tracking-widest text-[#FF5500] font-bold">
          High-Velocity Environment
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-3">
          How DevUpward Accelerates You
        </h2>
        <p className="text-gray-400 text-base leading-relaxed">
          Replaces isolated coding with intense peer accountability, continuous shipping, and genuine senior mentorship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 1: 2-column span */}
        <div className="md:col-span-2 rounded-2xl glass-panel p-8 glass-panel-hover transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF5500]/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none" />
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-[#FF5500]">
              <Rocket className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF7722] bg-orange-500/10 px-2.5 py-1 rounded-md">
              48-Hour Sprints
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2.5">
            Ship Real Software in Bi-Weekly Sprints
          </h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mb-6">
            Stop hoarding half-finished repositories. Form teams in Discord, build to a clear objective, 
            demo live on stream to the community, and earn bounties sponsored by developer-first startups.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono text-gray-300">
            <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">#live-demos</span>
            <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">#bounties</span>
            <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">#peer-feedback</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl glass-panel p-8 glass-panel-hover transition-all duration-300 group">
          <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-[#FF5500] mb-5">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Unfiltered PR Reviews
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Submit your pull requests for detailed code reviews covering complexity, edge cases, 
            memory usage, and architecture from senior practitioners.
          </p>
          <span className="text-xs font-mono text-[#FF7722]">
            Median turnaround: &lt; 45 minutes
          </span>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl glass-panel p-8 glass-panel-hover transition-all duration-300 group">
          <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-[#FF5500] mb-5">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Engineering Masterclasses
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Weekly live deep-dives with open-source authors and staff engineers breaking down production trade-offs and systems design.
          </p>
          <span className="text-xs font-mono text-gray-400">
            Recorded & accessible in the community vault
          </span>
        </div>

        {/* Card 4: 2-column span */}
        <div className="md:col-span-2 rounded-2xl glass-panel p-8 glass-panel-hover transition-all duration-300 relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-[#FF5500]">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF7722] bg-orange-500/10 px-2.5 py-1 rounded-md">
              Founder & Collaborator Mesh
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2.5">
            Find Your Next Technical Co-Founder
          </h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mb-6">
            The best projects require complementary minds. Pair up with systems specialists, UI artisans, 
            and product engineers who share your standards of craftsmanship.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" /> 34 collaborative ventures started inside DevUpward
          </div>
        </div>

      </div>
    </section>
  )
}

