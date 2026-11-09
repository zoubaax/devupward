import React from 'react'
import { ArrowUpRight, Calendar, UserCheck } from 'lucide-react'
import { UPCOMING_EVENTS } from '../../data/community'
import { SOCIAL_LINKS } from '../../data/navigation'
import SpotlightCard from '../reactbits/SpotlightCard'
import DecryptedText from '../reactbits/DecryptedText'

export function Events() {
  return (
    <section id="events" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/[0.08] bg-[#08090C]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FF5500] block mb-2">
            <DecryptedText text="SCHEDULE // 05" animateOn="view" speed={30} />
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
            Upcoming Community Sessions
          </h2>
        </div>
        <p className="text-white/50 text-xs sm:text-sm font-mono max-w-md">
          Live engineering masterclasses, systems architecture roasts, and 48-hour build sprints.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {UPCOMING_EVENTS.map((event) => (
          <SpotlightCard
            key={event.id}
            spotlightColor="rgba(255, 85, 0, 0.22)"
            className="rounded-xl border border-white/[0.08] hover:border-white/20 transition-all p-8 flex flex-col justify-between group bg-[#0C0D14]"
          >
            <div>
              <div className="flex items-center justify-between mb-6 text-[11px] font-mono">
                <span className="text-[#FF5500] uppercase tracking-wider font-semibold">{event.category}</span>
                <span className="text-white/40 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-white/30" />
                  <span>{event.schedule}</span>
                </span>
              </div>

              <h3 className="text-xl font-normal text-white mb-3 group-hover:text-[#FFAA55] transition-colors leading-snug">
                {event.title}
              </h3>
              <p className="text-white/60 text-xs font-mono mb-8">
                Host: <span className="text-white/90">{event.speaker}</span> <span className="text-white/40">({event.speakerRole})</span>
              </p>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/50 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{event.attendees} REGISTERED</span>
              </span>
              <a
                href={SOCIAL_LINKS.discord}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono uppercase tracking-wider text-white hover:text-[#FFAA55] flex items-center gap-1 transition-colors group-hover:translate-x-0.5 duration-150"
              >
                <span>RSVP Session</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FF5500]" />
              </a>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  )
}
