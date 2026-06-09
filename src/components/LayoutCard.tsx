import React, { useEffect, useState } from 'react'
import type { ApiResponse } from '../types/movie'
import { useFetch } from '../customHooks/useFetch'
import MovieCard from './MovieCard'
import Pagination from './Pagination'
import { useMovieStore } from '../zustand/movieStore'

function LayoutCard() {

  const { page, querry, setIncrementPage } = useMovieStore()

  const [movieDetails, setMovieDetails] = useState<ApiResponse>()
  const [loading, setLoading] = useState<Boolean>(false)

  // Reset page to 1 when query changes
  useEffect(() => {
    if (querry) {
      setIncrementPage() // Reset to page 1
    }
  }, [querry, setIncrementPage])

  // Conditional URL based on whether there's a search query
  const url: string = querry
    ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(querry)}&page=${page}`
    : `https://api.themoviedb.org/3/movie/popular?page=${page}`

  const fetchDataFromApi = async (url: string) => {

    setLoading(true)
    try {

      const data = await useFetch(url)

      console.log("check heere ???");


      if (data) {

        setMovieDetails({
          results: data?.results,
          page: data?.page,
          total_pages: data?.total_pages,
          total_results: data?.total_results
        })

      }




    } catch (error) {
      console.log("there is a problem loading data from api", error);

      setLoading(false)

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDataFromApi(url)
  }, [page, querry])


  return (
    loading ? (
      <section
        className="
    mx-auto
    h-[66vh]
    w-full
    max-w-7xl
    px-6
    pb-20
  "
      >
        <div
          className="
      flex
      h-full
      flex-col
      items-center
      justify-center
      gap-6
    "
        >
          <div
            className="
        h-16
        w-16
        animate-spin
        rounded-full
        border-4
        border-zinc-800
        border-t-[#F5C518]
      "
          />
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-bold text-white">
              Loading Movies
            </h3>
            <p className="text-sm text-zinc-400">
              Fetching the latest content...
            </p>
          </div>
        </div>
      </section>
    ) : (
      <div className="">
        {movieDetails?.results && movieDetails.results.length === 0 ? (
          <section
            data-testid="no-movies-found"
            className="mx-auto w-full max-w-7xl px-6 py-20"
          >
            <div
              className="flex flex-col items-center justify-center gap-4 rounded-2xl py-16 text-center"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <svg
                  className="h-8 w-8 text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">No Movies Found</h3>
              <p className="max-w-xs text-sm text-zinc-400">
                We couldn't find any movies matching your selection. Try a different search term.
              </p>
            </div>
          </section>
        ) : (
          <>
            <section
              className="
              mx-auto
              grid
              max-w-7xl
              gap-4
              px-4
              pb-10
              grid-cols-1
              sm:grid-cols-2
              sm:gap-5
              sm:px-5
              md:grid-cols-3
              md:gap-6
              md:px-6
              lg:grid-cols-4
              lg:gap-7
              lg:px-6
              xl:grid-cols-4
              2xl:grid-cols-4
            "
            >
              {/* cards */}
              {movieDetails?.results.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  rating={movie.vote_average}
                  title={movie.title}
                  releaseDate={movie.release_date}
                />
              ))}
            </section>

            <Pagination
              totalPages={movieDetails?.total_pages || 1}
              totalResults={movieDetails?.total_results}
            />
          </>
        )}
      </div>


    )
  )
}

export default LayoutCard