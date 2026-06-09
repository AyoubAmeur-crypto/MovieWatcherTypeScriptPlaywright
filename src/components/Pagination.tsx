import React from 'react'
import { useMovieStore } from '../zustand/movieStore'

interface PaginationProps {
  totalPages: number
  totalResults?: number
  resultsPerPage?: number
}

function Pagination({
  totalPages,
  totalResults,
  resultsPerPage = 20,
}: PaginationProps) {
  const { page: currentPage, setIncrementPage, setDecremnetPage, setPage } = useMovieStore()

  const getPageNumbers = () => {
    const maxPagesToShow = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }
    const pages = []
    for (let i = startPage; i <= endPage; i++) pages.push(i)
    return { pages, startPage, endPage }
  }

  const { pages, startPage, endPage } = getPageNumbers()
  const startResult = (currentPage - 1) * resultsPerPage + 1
  const endResult = Math.min(currentPage * resultsPerPage, totalResults || 0)

  const handlePrevious = () => {
    if (currentPage > 1) {
      setDecremnetPage()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setIncrementPage()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePageClick = (page: number) => {
    setPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="w-full px-6 pt-10">
      {/* Top divider */}
      <div
        className="mb-8 h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }}
      />

      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">

        {/* Results info */}
        {totalResults ? (
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Showing{' '}
            <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {startResult}–{endResult}
            </span>{' '}
            of{' '}
            <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {totalResults.toLocaleString()}
            </span>{' '}
            results
          </p>
        ) : (
          <div />
        )}

        {/* Page controls */}
        <div className="flex items-center gap-1.5">

          {/* Prev */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-30"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            onMouseEnter={e => {
              if (currentPage !== 1) {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'
                  ; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.18)'
              }
            }}
            onMouseLeave={e => {
              ; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)'
                ; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)'
            }}
            aria-label="Previous page"
          >
            <svg className="h-4 w-4" fill="none" stroke="rgba(255,255,255,0.6)" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* First page + ellipsis */}
          {startPage > 1 && (
            <>
              <PageBtn page={1} active={false} onClick={() => handlePageClick(1)} />
              {startPage > 2 && (
                <span className="flex h-9 w-6 items-center justify-center text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  ···
                </span>
              )}
            </>
          )}

          {/* Page numbers */}
          {pages.map((page) => (
            <PageBtn
              key={page}
              page={page}
              active={currentPage === page}
              onClick={() => handlePageClick(page)}
            />
          ))}

          {/* Last page + ellipsis */}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="flex h-9 w-6 items-center justify-center text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  ···
                </span>
              )}
              <PageBtn page={totalPages} active={false} onClick={() => handlePageClick(totalPages)} />
            </>
          )}

          {/* Next */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-30"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            onMouseEnter={e => {
              if (currentPage !== totalPages) {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'
                  ; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.18)'
              }
            }}
            onMouseLeave={e => {
              ; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)'
                ; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)'
            }}
            aria-label="Next page"
          >
            <svg className="h-4 w-4" fill="none" stroke="rgba(255,255,255,0.6)" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Page x of y */}
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Page{' '}
          <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {currentPage}
          </span>{' '}
          of{' '}
          <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {totalPages}
          </span>
        </p>
      </div>

      {/* Bottom divider */}
      <div
        className="mt-8 h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }}
      />
    </div>
  )
}

function PageBtn({
  page,
  active,
  onClick,
}: {
  page: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex h-9 min-w-[2.25rem] items-center justify-center rounded-xl px-1 text-sm font-semibold transition-all duration-200"
      style={
        active
          ? {
            background: '#F5C518',
            border: '1px solid #F5C518',
            color: '#000',
            boxShadow: '0 0 16px rgba(245,197,24,0.25)',
          }
          : {
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.5)',
          }
      }
      onMouseEnter={e => {
        if (!active) {
          const el = e.currentTarget as HTMLButtonElement
          el.style.background = 'rgba(245,197,24,0.08)'
          el.style.borderColor = 'rgba(245,197,24,0.3)'
          el.style.color = '#F5C518'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          const el = e.currentTarget as HTMLButtonElement
          el.style.background = 'rgba(255,255,255,0.04)'
          el.style.borderColor = 'rgba(255,255,255,0.08)'
          el.style.color = 'rgba(255,255,255,0.5)'
        }
      }}
    >
      {page}
    </button>
  )
}

export default Pagination