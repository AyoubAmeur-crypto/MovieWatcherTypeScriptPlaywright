import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface MovieCardProps {
  id: number
  title: string
  image: string
  rating: number
  releaseDate: string
  description?: string
  genre?: string[]
  duration?: string
}

export default function MovieCard({
  id,
  title,
  image,
  rating,
  releaseDate,
  description = 'A gripping story that takes you on an unforgettable journey through stunning visuals and powerful performances.',
  genre = ['Drama', 'Thriller'],
  duration = '2h 14m',
}: MovieCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const ratingColor =
    rating >= 8 ? '#22c55e' : rating >= 6 ? '#F5C518' : '#ef4444'

  const ratingBg =
    rating >= 8
      ? 'rgba(34,197,94,0.15)'
      : rating >= 6
      ? 'rgba(245,197,24,0.15)'
      : 'rgba(239,68,68,0.15)'

  return (
    <Link to={`/movie/${id}`} style={{ textDecoration: 'none' }}>
      <article
        data-testid="movieCard"
        className="group relative overflow-hidden rounded-2xl bg-[#0e0e0e] transition-all duration-500 hover:-translate-y-1 cursor-pointer"
        style={{
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        }}
      >
      {/* ── Poster area ── */}
      <div className="relative overflow-hidden" style={{ height: '340px' }}>
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Wishlist button */}
        <button
          onClick={() => setIsWishlisted((p) => !p)}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
          style={{
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
          aria-label="Add to watchlist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-all duration-200"
            fill={isWishlisted ? '#F5C518' : 'none'}
            stroke={isWishlisted ? '#F5C518' : 'rgba(255,255,255,0.8)'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>

        {/* Rating pill — top left */}
        <div
          className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full px-2.5 py-1"
          style={{
            background: ratingBg,
            backdropFilter: 'blur(8px)',
            border: `1px solid ${ratingColor}33`,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-3 w-3"
            fill={ratingColor}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span
            className="text-xs font-bold"
            style={{ color: ratingColor, letterSpacing: '0.02em' }}
          >
            {rating.toFixed(1)}
          </span>
        </div>

        {/* ── HOVER OVERLAY: description panel slides up ── */}
        <div
          className="absolute inset-0 z-10 flex flex-col justify-end transition-all duration-500"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)',
          }}
        >
          {/* Description panel */}
          <div
            className="translate-y-full transform p-5 transition-all duration-500 group-hover:translate-y-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.97) 60%, rgba(0,0,0,0.0) 100%)',
              paddingTop: '3rem',
            }}
          >
            {/* Genres */}
            <div className="mb-2 flex flex-wrap gap-1.5">
              {genre.map((g) => (
                <span
                  key={g}
                  className="rounded-full px-2 py-0.5 text-xs font-semibold"
                  style={{
                    background: 'rgba(245,197,24,0.12)',
                    color: '#F5C518',
                    border: '1px solid rgba(245,197,24,0.25)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Description */}
            <p
              className="line-clamp-3 text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              {description}
            </p>

            {/* Watch button */}
            <button
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-black transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ backgroundColor: '#F5C518', textDecoration: 'none' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch Now
            </button>
          </div>
        </div>
      </div>

      {/* ── Card footer ── */}
      <div className="px-4 pb-4 pt-3">
        <h2
          className="line-clamp-1 text-[15px] font-bold text-white"
          style={{ letterSpacing: '-0.01em' }}
        >
          {title}
        </h2>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {releaseDate}
          </span>

          <div
            className="flex items-center gap-1"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-xs">{duration}</span>
          </div>
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: '#F5C518' }}
      />
      </article>
    </Link>
  )
}