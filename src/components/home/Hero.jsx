import React, { useState } from 'react'
import { Sparkles, ArrowRight, Copy, Check, CheckCircle2 } from 'lucide-react'
import { DiscordIcon } from '../common/BrandIcons'
import { SOCIAL_LINKS } from '../../data/navigation'

export function Hero() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('cli')

  const copyCliCommand = () => {
    navigator.clipboard.writeText('npx devupward join')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center">

        {/* Live Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-[#FF5500]/25 backdrop-blur-md mb-8 group hover:border-[#FF5500]/50 transition-all cursor-default">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5500] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5500]" />
          </span>
          <span className="text-xs sm:text-sm font-mono text-gray-300 flex items-center gap-1.5">
            <span>Cohort 04 Open</span>
            <span className="text-gray-500">•</span>
            <span className="text-[#FF7722] font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 418 Devs Online Now
            </span>
          </span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.08] mb-6">
          Where Builders <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
            Turn Code Into
          </span>{' '}
          <span className="relative whitespace-nowrap">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] via-[#FF6E20] to-[#FFA040]">
              What's Next.
            </span>
            <span className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#FF5500] to-transparent rounded-full opacity-80" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed font-normal">
          The collaborative network for software engineers, systems designers, and technical creators. 
          Ship open-source software, get brutal code reviews, and level up alongside ambitious peers.
        </p>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-16">
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-semibold text-sm shadow-xl shadow-orange-950/40 overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF5500] via-[#FF6611] to-[#E64400]" />
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            <DiscordIcon className="w-4 h-4 relative z-10" />
            <span className="relative z-10 tracking-wide">Join 2,800+ Engineers</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            type="button"
            onClick={copyCliCommand}
            className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 px-5 py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-gray-300 font-mono text-xs sm:text-sm transition-all group"
          >
            <div className="flex items-center gap-2">
              <span className="text-[#FF5500]">$</span>
              <span>npx devupward join</span>
            </div>
            <div className="flex items-center gap-1.5 pl-3 border-l border-white/10 text-xs text-gray-400 group-hover:text-white">
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Interactive Code / Dashboard Preview */}
        <div className="w-full max-w-4xl mx-auto rounded-xl glass-panel p-2 shadow-2xl shadow-orange-950/20 border border-white/10">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.08] bg-black/40 rounded-t-lg">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-3 text-xs font-mono text-gray-500 hidden sm:inline">
                devupward-mesh // session v2.4
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('cli')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'cli'
                    ? 'bg-white/10 text-[#FF7722] font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                terminal.sh
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pulse')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'pulse'
                    ? 'bg-white/10 text-[#FF7722] font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                network.json
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-6 bg-[#07080D]/90 rounded-b-lg text-left font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[190px]">
            {activeTab === 'cli' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-[#FF5500]">builder@devupward:~$</span>
                  <span className="text-white">devupward sync --ecosystem</span>
                </div>
                <div className="text-gray-400 pt-0.5">
                  [AUTH] Verified member token: <span className="text-orange-300 font-semibold">devupward_builder</span>
                </div>
                <div className="text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Connected to DevUpward Mesh (38 regions online)</span>
                </div>
                <div className="text-gray-300 bg-white/[0.02] p-3 rounded-lg border border-white/5 space-y-1 my-1.5">
                  <div className="text-[#FFA040] font-semibold">⚡ Current Ecosystem Activity:</div>
                  <div className="text-gray-400">• Sprint #08: <span className="text-white">High-Throughput Agents</span> ($3,500 bounty pool)</div>
                  <div className="text-gray-400">• Upcoming Masterclass: <span className="text-white">Distributed RAG Pipelines</span> (Thursday 7 PM UTC)</div>
                  <div className="text-gray-400">• Open PR Reviews: <span className="text-emerald-400 font-semibold">27 reviews in flight</span></div>
                </div>
              </div>
            )}

            {activeTab === 'pulse' && (
              <pre className="text-gray-300 leading-snug">
{`{
  "community": "DevUpward",
  "active_nodes": 2842,
  "top_stacks": ["Rust", "TypeScript", "Go", "Python", "Kubernetes"],
  "sprint_status": "ACTIVE_SPRINT_08",
  "philosophy": "Build in public, review rigorously, ship relentlessly."
}`}
              </pre>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}

