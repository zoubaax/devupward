import React, { useState } from 'react'
import { ArrowUpRight, Hash, GitBranch } from 'lucide-react'
import { SOCIAL_LINKS } from '../../data/navigation'
import DecryptedText from '../reactbits/DecryptedText'

const DETAILED_TRACKS = [
  {
    id: 'ai',
    tag: 'TRACK // 01',
    title: 'AI & Autonomous Systems',
    desc: 'Local model inference, autonomous agent orchestration, fine-tuning pipelines, and distributed vector storage.',
    channel: '#ai-autonomous-agents',
    activeRfc: 'RFC-108: Apple Silicon & CUDA 4-bit Quantization Benchmarks',
    lastCommit: 'feat: add streaming backpressure to agent loop (#89)',
    buildersOnline: 384,
    tech: ['PyTorch', 'vLLM', 'Ollama', 'Python', 'LangChain'],
    terminalLogs: [
      '$ devupward mesh status --guild ai',
      '> Active cluster: 384 nodes connected',
      '> Model runner: vLLM 0.6.4 (paged_attention enabled)',
      '> Last sprint submission: "PromptMatrix" v1.2',
    ],
  },
  {
    id: 'systems',
    tag: 'TRACK // 02',
    title: 'Systems & Cloud Infrastructure',
    desc: 'High-throughput microservices, distributed databases, kernel internals, Go, Rust, and container orchestration.',
    channel: '#systems-distributed-infra',
    activeRfc: 'RFC-094: Lock-free ring buffer for asynchronous gRPC proxy',
    lastCommit: 'perf: eliminate heap allocations in Raft heartbeat (#142)',
    buildersOnline: 298,
    tech: ['Rust', 'Go', 'Docker', 'Kubernetes', 'eBPF', 'PostgreSQL'],
    terminalLogs: [
      '$ devupward mesh status --guild systems',
      '> Nodes online: 298 systems engineers',
      '> Active review: PR #142 (Zero-copy network serialization)',
      '> Consensus health: 99.98% peer sync across regions',
    ],
  },
  {
    id: 'frontend',
    tag: 'TRACK // 03',
    title: 'Frontend & UI Engineering',
    desc: 'Design systems, React 19 concurrent features, WebGL shaders, Tailwind v4 architecture, and fluid micro-interactions.',
    channel: '#frontend-craftsmanship',
    activeRfc: 'RFC-078: Compiler-driven zero-runtime design token system',
    lastCommit: 'refactor: replace CSS bundle with Tailwind v4 engine (#64)',
    buildersOnline: 412,
    tech: ['React 19', 'TypeScript', 'Tailwind v4', 'Vite', 'Three.js'],
    terminalLogs: [
      '$ devupward mesh status --guild frontend',
      '> Active nodes: 412 UI engineers & designers',
      '> Framework: React 19 + Tailwind v4 + Vite 8',
      '> Recent showcase: "DitherCanvas" interactive physics',
    ],
  },
  {
    id: 'oss',
    tag: 'TRACK // 04',
    title: 'Open Source Labs',
    desc: 'RFC review circles, community-maintained developer CLI tools, and first-time maintainer sprint mentorship.',
    channel: '#open-source-guild',
    activeRfc: 'RFC-051: DevUpward CLI v2.0 Plugin Architecture',
    lastCommit: 'release: devupward-cli v2.1.0 published to npm (#230)',
    buildersOnline: 520,
    tech: ['GitHub Actions', 'Monorepos', 'CI/CD', 'Documentation'],
    terminalLogs: [
      '$ devupward mesh status --guild oss',
      '> Active contributors: 520 maintainers',
      '> Weekly PR roast: 32 pull requests reviewed',
      '> Open bounties: $3,500 across 4 repositories',
    ],
  },
]

export function Tracks() {
  const [activeTrackId, setActiveTrackId] = useState('ai')
  const currentTrack = DETAILED_TRACKS.find((t) => t.id === activeTrackId) || DETAILED_TRACKS[0]

  return (
    <section id="tracks" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/[0.08] bg-[#08090C]">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FF5500] block mb-2">
            <DecryptedText text="SPECIALIZED CHANNELS // 02" animateOn="view" speed={30} />
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
            Engineering Guilds
          </h2>
        </div>
        <p className="text-white/40 text-xs sm:text-sm font-mono max-w-md">
          Deep, noise-free channels where practitioners exchange line-by-line architecture and ship software.
        </p>
      </div>

      {/* Interactive Track Selector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Track Navigation Buttons */}
        <div className="lg:col-span-5 flex flex-col gap-2">
          {DETAILED_TRACKS.map((track) => {
            const isSelected = track.id === activeTrackId
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setActiveTrackId(track.id)}
                className={`p-6 text-left transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white/[0.04] border-white/40 text-white'
                    : 'bg-transparent border-white/10 text-white/50 hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#FF5500] uppercase tracking-wider">
                    {track.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{track.buildersOnline} Online</span>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-white mb-1.5">
                  {track.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-light line-clamp-2">
                  {track.desc}
                </p>
              </button>
            )
          })}
        </div>

        {/* Right Column: Live Channel Inspector Terminal */}
        <div className="lg:col-span-7 border border-white/[0.08] bg-[#0C0D14] p-6 sm:p-8 flex flex-col justify-between rounded-xl">
          <div>
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2 text-white/80">
                <Hash className="w-4 h-4 text-[#FF5500]" />
                <span className="font-semibold text-white">{currentTrack.channel}</span>
              </div>
              <span className="text-white/40 text-[10px]">
                MESH STATUS: SYNCHRONIZED
              </span>
            </div>

            {/* Active Discussion / RFC */}
            <div className="py-6 space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider block mb-1">
                  CURRENT ACTIVE RFC
                </span>
                <p className="text-sm sm:text-base text-white font-mono">
                  {currentTrack.activeRfc}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider block mb-1">
                  LATEST PULL REQUEST MERGE
                </span>
                <div className="flex items-center gap-2 text-xs font-mono text-[#FFAA55]">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>{currentTrack.lastCommit}</span>
                </div>
              </div>

              {/* Terminal Logs Simulation */}
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider block mb-2">
                  SYSTEM LOGS
                </span>
                <div className="bg-[#08090C] p-4 border border-white/[0.06] font-mono text-xs text-white/70 space-y-1 rounded-lg">
                  {currentTrack.terminalLogs.map((log, i) => (
                    <div key={i} className={i === 0 ? 'text-[#FF5500]' : 'text-white/60'}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {currentTrack.tech.map((t) => (
                <span key={t} className="text-[10px] font-mono px-2 py-0.5 border border-white/10 text-white/60">
                  {t}
                </span>
              ))}
            </div>

            <a
              href={SOCIAL_LINKS.discord}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-white text-black text-xs font-mono uppercase tracking-wider font-semibold hover:bg-white/90 transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Join Channel</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

    </section>
  )
}
