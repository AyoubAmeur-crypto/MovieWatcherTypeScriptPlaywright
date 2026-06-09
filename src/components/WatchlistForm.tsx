import { useState } from 'react'
import { useMovieStore } from '../zustand/movieStore'

export default function WatchlistForm() {
  const [input, setInput] = useState('')
  const { addToWatchlist, watchlist, removeFromWatchlist } = useMovieStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      addToWatchlist(input.trim())
      setInput('')
    }
  }

  return (
    <div className="w-full px-6 py-10">

      {/* Top divider */}
      <div
        className="mb-10 h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }}
      />

      <div className="mx-auto max-w-7xl">

        {/* Header row */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Your List
            </p>
            <h2 className="text-3xl font-black tracking-tight text-white">
              Watchlist
            </h2>
          </div>

          {watchlist.length > 0 && (
            <div
              className="flex items-center gap-2 rounded-full px-3 py-1"
              style={{
                background: 'rgba(245,197,24,0.1)',
                border: '1px solid rgba(245,197,24,0.25)',
              }}
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="#F5C518">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              <span className="text-xs font-bold" style={{ color: '#F5C518' }}>
                {watchlist.length} {watchlist.length === 1 ? 'title' : 'titles'}
              </span>
            </div>
          )}
        </div>

        {/* Add form */}
        <form onSubmit={handleSubmit} className="mb-8 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a movie or show title…"
            data-testid="watchlist-input"
            className="flex-1 rounded-xl px-5 py-3.5 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = 'rgba(245,197,24,0.4)'
              e.currentTarget.style.background = 'rgba(245,197,24,0.04)'
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
            }}
          />
          <button
            type="submit"
            data-testid="add-button"
            className="flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-black transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{ backgroundColor: '#F5C518' }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
            </svg>
            Add
          </button>
        </form>

        {/* List */}
        {watchlist.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center gap-4 rounded-2xl py-16"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <svg className="h-5 w-5" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Your watchlist is empty — add something to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {watchlist.map((item, index) => (
              <div
                key={item.id}
                data-testid="watchlist-item"
                className="group flex items-center justify-between rounded-xl px-5 py-4 transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Index number */}
                  <span
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                    style={{
                      background: 'rgba(245,197,24,0.08)',
                      color: 'rgba(245,197,24,0.5)',
                      border: '1px solid rgba(245,197,24,0.15)',
                    }}
                  >
                    {index + 1}
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      Added {new Date(item.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromWatchlist(item.id)}
                  name='remove'
                  data-testid={`delete-button-${item.id}`}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 active:scale-90"
                  style={{
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.15)',
                    color: 'rgba(239,68,68,0.6)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(239,68,68,0.15)'
                    e.currentTarget.style.color = '#ef4444'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(239,68,68,0.08)'
                    e.currentTarget.style.color = 'rgba(239,68,68,0.6)'
                  }}
                  aria-label="Remove from watchlist"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom divider */}
      <div
        className="mt-10 h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }}
      />
    </div>
  )
}