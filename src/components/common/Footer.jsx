import React from 'react'
import { NAV_LINKS, SOCIAL_LINKS } from '../../data/navigation'
import { DiscordIcon, GithubIcon } from './BrandIcons'
import ShinyText from '../reactbits/ShinyText'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#07080C] text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="col-span-2">
            <img src="/logo.png" alt="DevUpward" className="h-9 w-auto mb-4 object-contain" />
            <p className="text-gray-400 text-sm max-w-sm mb-4 leading-relaxed">
              DevUpward is the global engineering collective dedicated to pushing the boundaries 
              of software craftsmanship, open-source velocity, and collaborative systems building.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-gray-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.discord}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-gray-300 hover:text-white transition-colors"
                aria-label="Discord"
              >
                <DiscordIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white text-xs font-mono uppercase tracking-wider font-semibold mb-4">
              Community
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white text-xs font-mono uppercase tracking-wider font-semibold mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href="#code-of-conduct" className="hover:text-white transition-colors">Code of Conduct</a></li>
              <li><a href="#guidelines" className="hover:text-white transition-colors">Review Guidelines</a></li>
              <li><a href="#speakers" className="hover:text-white transition-colors">Speaker RFCs</a></li>
              <li><a href="#brand" className="hover:text-white transition-colors">Brand Assets</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white text-xs font-mono uppercase tracking-wider font-semibold mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href={SOCIAL_LINKS.discord} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Discord</a></li>
              <li><a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Org</a></li>
              <li><a href={SOCIAL_LINKS.x} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">X / Twitter</a></li>
              <li><a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">YouTube</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-mono gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <ShinyText color="#9CA3AF" shineColor="#FFFFFF" speed={5}>
              All Systems Operational • Mesh Online
            </ShinyText>
          </div>
          <div>
            © 2026 DevUpward. Building What's Next.
          </div>
        </div>
      </div>
    </footer>
  )
}

