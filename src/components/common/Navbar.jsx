import React, { useState } from 'react'
import { Menu, X, Star } from 'lucide-react'
import { NAV_LINKS, SOCIAL_LINKS } from '../../data/navigation'
import { DiscordIcon, GithubIcon } from './BrandIcons'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090A0F]/85 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="DevUpward" 
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF5500] rounded-full blur-[2px] opacity-75 animate-ping" />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#FF7722] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3.5">
          <a 
            href={SOCIAL_LINKS.github} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-gray-300 transition-all"
          >
            <GithubIcon className="w-4 h-4 text-gray-300" />
            <span>GitHub</span>
            <span className="flex items-center gap-1 text-[#FF5500] pl-1 border-l border-white/10">
              <Star className="w-3 h-3 fill-current" />
              1.4k
            </span>
          </a>

          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noreferrer"
            className="relative group inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-xs sm:text-sm text-white overflow-hidden shadow-lg shadow-orange-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#FF5500] via-[#FF6A1A] to-[#E64A00]" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20" />
            <DiscordIcon className="w-4 h-4 relative z-10" />
            <span className="relative z-10 font-semibold tracking-wide">Join Discord</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          type="button" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0C0E15] border-b border-white/10 px-6 py-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-[#FF7722] text-base font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href={SOCIAL_LINKS.discord}
              target="_blank"
              rel="noreferrer"
              className="w-full text-center py-2.5 bg-[#FF5500] hover:bg-[#FF6611] text-white font-semibold rounded-lg text-sm flex items-center justify-center gap-2"
            >
              <DiscordIcon className="w-4 h-4" />
              Join Discord Community
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

