import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { UPCOMING_EVENTS } from '../../data/community'
import { SOCIAL_LINKS } from '../../data/navigation'

export function Events() {
  return (
    <section id="events" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10 bg-[#000000]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FF5500] block mb-2">
            SCHEDULE // 04
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
            Upcoming Community Sessions
          </h2>
        </div>
        <p className="text-white/40 text-xs sm:text-sm font-mono max-w-md">
          Live engineering masterclasses, systems architecture roasts, and 48-hour build sprints.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
        {UPCOMING_EVENTS.map((event) => (
          <div 
            key={event.id} 
            className="bg-[#000000] p-8 flex flex-col justify-between hover:bg-white/[0.02] transition-colors group"
          >
            <div>
              <div className="flex items-center justify-between mb-6 text-[11px] font-mono">
                <span className="text-[#FF5500] uppercase tracking-wider">{event.category}</span>
                <span className="text-white/40">{event.schedule}</span>
              </div>

              <h3 className="text-xl font-normal text-white mb-3 group-hover:text-[#FFAA55] transition-colors">
                {event.title}
              </h3>
              <p className="text-white/50 text-xs font-mono mb-8">
                Host: <span className="text-white/80">{event.speaker}</span> ({event.speakerRole})
              </p>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/40">
                {event.attendees} REGISTERED
              </span>
              <a
                href={SOCIAL_LINKS.discord}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono uppercase tracking-wider text-white hover:text-[#FFAA55] flex items-center gap-1 transition-colors"
              >
                <span>RSVP Session</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
