import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFetch } from '../customHooks/useFetch'
import type { Movie } from '../types/movie'
import Navbar from '../components/Navbar'

function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true)
        const data = await useFetch(`https://api.themoviedb.org/3/movie/${id}`)
        if (data) setMovie(data)
      } catch (error) {
        console.log('Error fetching movie details:', error)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchMovieDetails()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <section className="mx-auto flex h-[66vh] w-full max-w-7xl flex-col items-center justify-center gap-5 px-6">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-zinc-800 border-t-[#F5C518]" />
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Fetching movie details…
          </p>
        </section>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <section className="mx-auto flex h-[66vh] w-full max-w-7xl flex-col items-center justify-center gap-6 px-6">
          <p className="text-lg font-semibold text-white">Movie not found</p>
          <button
            onClick={() => navigate('/')}
            className="rounded-xl px-6 py-3 text-sm font-bold text-black transition hover:brightness-110"
            style={{ backgroundColor: '#F5C518' }}
          >
            Go Back Home
          </button>
        </section>
      </div>
    )
  }

  const releaseYear = movie.release_date?.split('-')[0] ?? 'N/A'
  const fullDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A'

  const ratingColor =
    movie.vote_average >= 8
      ? '#22c55e'
      : movie.vote_average >= 6
      ? '#F5C518'
      : '#ef4444'

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* ── Backdrop hero ── */}
      <div className="relative min-h-[80vh] w-full overflow-hidden pt-20">
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: 'brightness(0.45) saturate(0.7)' }}
          />
        )}

        {/* bottom fade to black */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 50%, #000 100%)',
          }}
        />
        {/* side vignettes */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="flex flex-col gap-10 md:flex-row md:items-end">

            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="w-44 rounded-2xl md:w-56"
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
                }}
              />
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col gap-5">

              {/* Genre pills */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((g: { id: number; name: string }) => (
                    <span
                      key={g.id}
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        background: 'rgba(245,197,24,0.1)',
                        border: '1px solid rgba(245,197,24,0.25)',
                        color: '#F5C518',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <div>
                <h1
                  className="text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl"
                  style={{ textShadow: '0 4px 32px rgba(0,0,0,0.7)' }}
                  data-testid="movieTitle"
                >
                  {movie.title}
                </h1>
                {movie.original_title !== movie.title && (
                  <p className="mt-2 text-base" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {movie.original_title}
                  </p>
                )}
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Rating */}
                <div
                  className="flex items-center gap-1.5 rounded-full px-3 py-1"
                  style={{
                    background: `${ratingColor}18`,
                    border: `1px solid ${ratingColor}33`,
                  }}
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill={ratingColor}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-sm font-bold" style={{ color: ratingColor }}>
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    ({movie.vote_count.toLocaleString()})
                  </span>
                </div>

                {/* Year */}
                <span
                  className="rounded-full px-3 py-1 text-sm font-semibold"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  {releaseYear}
                </span>

                {/* Language */}
                {movie.original_language && (
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {movie.original_language}
                  </span>
                )}

                {/* Runtime */}
                {movie.runtime && (
                  <span
                    className="flex items-center gap-1.5 rounded-full px-3 py-1 text-sm"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                )}
              </div>

              {/* Overview */}
              <p
                className="max-w-2xl text-base leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {movie.overview || 'No description available.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  className="flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-bold text-black transition-all hover:brightness-110 active:scale-95"
                  style={{ backgroundColor: '#F5C518' }}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Watch Now
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold text-white transition-all hover:border-white/30 active:scale-95"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Movies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Details section ── */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-16">

        {/* Thin divider */}
        <div
          className="mb-12 h-px w-full"
          style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }}
        />

        <div className="grid gap-6 md:grid-cols-3">

          {/* Stat card — Rating */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Rating
            </p>
            <div className="mt-4 flex items-end gap-3">
              <span className="text-5xl font-black" style={{ color: '#F5C518' }}>
                {movie.vote_average.toFixed(1)}
              </span>
              <div className="mb-1">
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>/10</p>
                <p className="text-sm font-semibold text-white">{movie.vote_count.toLocaleString()}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>votes</p>
              </div>
            </div>
          </div>

          {/* Stat card — Release */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Release Date
            </p>
            <p className="mt-4 text-2xl font-bold text-white">{fullDate}</p>
          </div>

          {/* Stat card — Popularity */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Popularity Score
            </p>
            <p className="mt-4 text-5xl font-black text-white">
              {movie.popularity.toFixed(0)}
            </p>
          </div>
        </div>

        {/* Budget / Revenue row — only if data exists */}
        {(movie.budget > 0 || movie.revenue > 0) && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {movie.budget > 0 && (
              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Budget
                </p>
                <p className="mt-3 text-2xl font-bold text-white">
                  ${movie.budget.toLocaleString()}
                </p>
              </div>
            )}
            {movie.revenue > 0 && (
              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Box Office
                </p>
                <p className="mt-3 text-2xl font-bold text-white">
                  ${movie.revenue.toLocaleString()}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Bottom divider */}
        <div
          className="mt-12 h-px w-full"
          style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }}
        />
      </section>
    </div>
  )
}

export default MovieDetail