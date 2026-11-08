import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQS } from '../../data/community'

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/[0.08]">
      <div className="text-center mb-16">
        <span className="text-xs uppercase font-mono tracking-widest text-[#FF5500] font-bold">
          FAQ
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Everything you need to know about joining, contributing, and collaborating.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx
          return (
            <div 
              key={idx}
              className="rounded-xl glass-panel border border-white/10 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:text-[#FF7722] transition-colors"
              >
                <span className="font-semibold text-base text-gray-100 pr-4">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#FF5500]' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3">
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

