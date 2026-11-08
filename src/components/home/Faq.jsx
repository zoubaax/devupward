import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQS } from '../../data/community'

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10 bg-[#000000]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FF5500] block mb-2">
            PROTOCOL // 06
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
            Frequently Answered
          </h2>
        </div>
        <p className="text-white/40 text-xs sm:text-sm font-mono max-w-md">
          Guidelines, standards, and everything you need to know about joining.
        </p>
      </div>

      <div className="border border-white/10 divide-y divide-white/10">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx
          return (
            <div key={idx} className="bg-[#000000] transition-colors">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-normal text-base sm:text-lg text-white pr-4">{faq.question}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 text-white/40 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-8 pb-6 text-xs sm:text-sm text-white/60 leading-relaxed font-light border-t border-white/5 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
