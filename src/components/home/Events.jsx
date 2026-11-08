import React from 'react'
import { Users, ArrowRight } from 'lucide-react'
import { UPCOMING_EVENTS } from '../../data/community'
import { SOCIAL_LINKS } from '../../data/navigation'

export function Events() {
  return (
    <section id="events" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase font-mono tracking-widest text-[#FF5500] font-bold">
          Knowledge Sharing & Sprints
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-3">
          Upcoming Community Sessions
        </h2>
        <p className="text-gray-400 text-base">
          Interactive coding masterclasses, live architecture roasts, and weekend hackathons.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {UPCOMING_EVENTS.map((event) => (
          <div 
            key={event.id} 
            className="rounded-2xl glass-panel p-6 glass-panel-hover transition-all flex flex-col justify-between border border-white/10"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono font-medium text-[#FF7722] bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20">
                  {event.category}
                </span>
                <span className="text-xs font-mono text-gray-400">{event.schedule}</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                {event.title}
              </h3>
              <p className="text-xs text-gray-400 mb-6 font-mono">
                Led by: <span className="text-gray-200">{event.speaker}</span> ({event.speakerRole})
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#FF5500]" />
                {event.attendees} Attending
              </span>
              <a
                href={SOCIAL_LINKS.discord}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-[#FF5500] px-3 py-1.5 rounded-lg transition-colors"
              >
                <span>RSVP</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

