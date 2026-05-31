import React from 'react'

function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden">

      {/* ── Background movie collage ── */}
      <div className="absolute inset-0 z-0">
        {/* Single hero image — happy family on couch watching TV */}
        "https://images.unsplash.com/photo-1648171319494-a0491276e3a9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        <img
          src="https://images.unsplash.com/photo-1648171319494-a0491276e3a9?w=1400&q=85"
          alt="Happy family gathered on a couch watching TV together"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />

        {/* ── THE HERO SHADOW: multi-stop gradient from transparent → pure black ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.88) 75%, rgba(0,0,0,0.97) 90%, #000 100%)',
          }}
        />

        {/* Subtle left-edge vignette for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.45) 100%)',
          }}
        />
      </div>

      {/* ── Foreground content ── */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-20 pt-32 text-center">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-1.5 backdrop-blur-sm">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: '#F5C518' }}
          />
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-300">
            Discover · Rate · Explore
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl font-black leading-[1.05] tracking-tight text-white md:text-7xl"
          style={{ textShadow: '0 4px 32px rgba(0,0,0,0.7)' }}
        >
          Discover Your Next
          <span
            className="mt-1 block"
            style={{
              color: '#F5C518',
              textShadow: '0 0 60px rgba(245,197,24,0.3), 0 4px 32px rgba(0,0,0,0.7)',
            }}
          >
            Favorite Movie
          </span>
        </h1>

        {/* Sub-copy */}
        <p
          className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 md:text-lg"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
        >
          Search thousands of movies and explore ratings,
          posters and details in one beautiful experience.
        </p>

        {/* CTA row */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => {
              const searchElement = document.getElementById('search-section')
              searchElement?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-black transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{ backgroundColor: '#F5C518' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Search Movies
          </button>

          <button className="rounded-full border border-zinc-600 bg-zinc-900/50 px-8 py-3.5 text-sm font-semibold text-zinc-200 backdrop-blur-sm transition-all duration-200 hover:border-zinc-400 hover:text-white active:scale-95">
            Browse Top Rated
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-14 flex items-center justify-center gap-8 text-center">
          {[
            { value: '500K+', label: 'Movies' },
            { value: '4.8★', label: 'Avg Rating' },
            { value: '12M+', label: 'Reviews' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p
                className="text-2xl font-black text-white"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
              >
                {value}
              </p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-zinc-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero