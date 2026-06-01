import React, { useEffect, useState } from 'react'

interface NavbarProps {
  onLogout?: () => void
}

function Navbar({ onLogout }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = ['Movies', 'TV Shows', 'Top Rated']

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(0, 0, 0, 0.55)'
          : 'rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Main navbar container */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">

        {/* Left — nav links (hidden on mobile) */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs font-medium text-zinc-400 transition-colors duration-200 hover:text-[#F5C518] sm:text-sm"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Center — logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="select-none text-lg font-black tracking-tight sm:text-2xl">
            <span style={{ color: '#F5C518' }}>Movie</span>
            <span className="text-white">Watcher</span>
          </h1>
        </div>

        {/* Right — logout button (desktop) + mobile menu button */}
        <div className="flex items-center gap-3">
          {onLogout && (
            <button
              onClick={onLogout}
              data-testid="logout-button"
              className="hidden px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-200 hover:text-[#F5C518] hover:bg-zinc-800/60 rounded-lg md:inline-flex"
            >
              Logout
            </button>
          )}
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 transition-all duration-300 md:hidden hover:bg-zinc-800 hover:text-[#F5C518]"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 transition-transform duration-300"
              style={{
                transform: mobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu with smooth animation */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          borderTop: mobileMenuOpen ? '1px solid rgba(255,255,255,0.08)' : 'none',
        }}
      >
        <div className="space-y-1 bg-gradient-to-b from-zinc-900/50 to-black/80 px-4 py-3 backdrop-blur-sm">
          {navItems.map((item, index) => (
            <a
              key={item}
              href="#"
              className="block transform rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-200 hover:bg-zinc-800/60 hover:text-[#F5C518] hover:pl-6"
              style={{
                transitionDelay: mobileMenuOpen ? `${index * 30}ms` : '0ms',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          {onLogout && (
            <button
              onClick={() => {
                onLogout()
                setMobileMenuOpen(false)
              }}
              className="w-full text-left transform rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 hover:pl-6"
              style={{
                transitionDelay: mobileMenuOpen ? `${navItems.length * 30}ms` : '0ms',
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar