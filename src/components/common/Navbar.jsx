import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, SOCIAL_LINKS } from '../../data/navigation'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-24 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="DevUpward" 
            className="h-9 sm:h-10 w-auto object-contain"
          />
        </a>

        {/* Center Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-[11px] font-mono uppercase tracking-[0.2em] text-white/60">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-sm text-xs font-mono uppercase tracking-wider bg-white text-black hover:bg-white/90 transition-all font-semibold"
          >
            Enter Guild
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          type="button" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white/80 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-6 py-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white/70 hover:text-white text-xs font-mono uppercase tracking-widest"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10">
            <a
              href={SOCIAL_LINKS.discord}
              target="_blank"
              rel="noreferrer"
              className="w-full text-center py-2.5 bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold block"
            >
              Enter Guild
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
