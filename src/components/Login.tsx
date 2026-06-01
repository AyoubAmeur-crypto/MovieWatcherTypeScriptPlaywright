import { useState } from 'react'

interface LoginProps {
  onLogin: () => void
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (username === 'user1234' && password === 'password') {
      onLogin()
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center p-4">

      {/* ── Cinematic background ── */}
      <img
        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: 'brightness(0.35) saturate(1)', objectPosition: 'center center' }}
      />

      {/* Multi-stop gradient: dark left panel fading to image */}
      <div
        className="absolute inset-0"
        
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)',
        }}
      />

      {/* ── Layout: form left, visual right ── */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center gap-16">

        {/* Left — form panel */}
        <div className="w-full max-w-sm flex-shrink-0">

          {/* Logo */}
          <div className="mb-10">
            <div className="flex items-center  ">
            
              <span className="text-4xl font-black tracking-tight text-white">
                Movie<span style={{ color: '#F5C518' }}>Watcher</span>
              </span>
            </div>
            
          </div>

          {/* Card */}
          <div
            className="w-full rounded-2xl p-8"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <h2 className="mb-1 text-2xl font-black text-white">Sign In</h2>
            <p className="mb-7 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Welcome back — pick up where you left off.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-xs font-semibold uppercase tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="user1234"
                  data-testid="login-username"
                  className="w-full rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = 'rgba(245,197,24,0.4)'
                    e.currentTarget.style.background = 'rgba(245,197,24,0.04)'
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-semibold uppercase tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    data-testid="login-password"
                    className="w-full rounded-xl px-4 py-3.5 pr-12 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = 'rgba(245,197,24,0.4)'
                      e.currentTarget.style.background = 'rgba(245,197,24,0.04)'
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-80"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg className="h-4 w-4" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  className="flex items-center gap-2 rounded-xl px-4 py-3"
                  style={{
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.2)',
                  }}
                >
                  <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p className="text-sm" style={{ color: '#ef4444' }} data-testid="login-error">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                data-testid="login-button"
                className="mt-2 w-full rounded-xl py-3.5 text-sm font-bold text-black transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{ backgroundColor: '#F5C518' }}
              >
                Sign In
              </button>
            </form>

            {/* Demo credentials */}
            <div
              className="mt-6 rounded-xl px-4 py-3.5"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <p className="mb-2.5 text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Demo credentials
              </p>
              <div className="space-y-1">
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Username:{' '}
                  <span className="font-mono font-semibold" style={{ color: '#F5C518' }}>
                    user1234
                  </span>
                </p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Password:{' '}
                  <span className="font-mono font-semibold" style={{ color: '#F5C518' }}>
                    password
                  </span>
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Secure login · Local authentication
          </p>
        </div>

        {/* Right — tagline (desktop only) */}
        <div className="hidden md:flex flex-1 flex-col gap-6">
          <h1
            className="text-5xl font-black leading-[1.05] tracking-tight text-white lg:text-6xl"
            style={{ textShadow: '0 4px 32px rgba(0,0,0,0.6)' }}
          >
            Your watchlist,
            <span className="block" style={{ color: '#F5C518' }}>
              your world.
            </span>
          </h1>
          <p className="max-w-sm text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Thousands of movies. Ratings, trailers, details — all in one beautifully simple experience.
          </p>

          {/* Mini stats */}
          <div className="mt-4 flex items-center gap-8">
            {[
              { value: '500K+', label: 'Movies' },
              { value: '4.8★', label: 'Avg Rating' },
              { value: '12M+', label: 'Reviews' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}