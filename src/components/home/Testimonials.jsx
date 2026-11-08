import React from 'react'
import { TESTIMONIALS } from '../../data/community'

export function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase font-mono tracking-widest text-[#FF5500] font-bold">
          Developer Testimonials
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-3">
          Built with and for Engineers
        </h2>
        <p className="text-gray-400 text-base">
          What members say about their experience shipping within DevUpward.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((item, idx) => (
          <div 
            key={idx} 
            className="rounded-2xl glass-panel p-7 glass-panel-hover transition-all flex flex-col justify-between border border-white/10"
          >
            <p className="text-gray-300 text-sm leading-relaxed mb-8 italic">
              "{item.quote}"
            </p>

            <div className="flex items-center gap-3">
              <img 
                src={item.avatar} 
                alt={item.author} 
                className="w-10 h-10 rounded-full object-cover border border-[#FF5500]/40" 
              />
              <div>
                <h4 className="text-sm font-bold text-white">{item.author}</h4>
                <p className="text-xs text-gray-400">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

