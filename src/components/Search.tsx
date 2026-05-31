import React, { useEffect, useState } from 'react'
import { useMovieStore } from '../zustand/movieStore'

function Search() {
  const [searchQuerry,setSearchQuerry]=useState<string>('')

  const {setQuerry} = useMovieStore()

  
 
  return (
    <section id="search-section" className="mx-auto w-full py-12">
      <div className="mx-auto max-w-3xl px-6">
        <form className="space-y-4">
          {/* Search header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white">
              Find Your Next Favorite
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Search through thousands of movies
            </p>
          </div>

          {/* Search input and button */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <input
                type="text"
                onChange={(e)=>setSearchQuerry(e.target.value)}
                value={searchQuerry}
                placeholder="Search movies by title, actor, director..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-zinc-700
                  bg-zinc-900
                  px-5
                  py-4
                  text-white
                  outline-none
                  transition
                  placeholder:text-zinc-500
                  focus:border-[#F5C518]
                  focus:bg-zinc-850
                  hover:border-zinc-600
                "
              />
              <svg
                className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <button
              type="button"
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#F5C518]
                px-8
                py-4
                font-bold
                text-black
                transition-all
                duration-200
                hover:brightness-110
                active:scale-95
              "
              onClick={(e)=>{
                e.preventDefault()
                setQuerry(searchQuerry)
              }}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </button>
          </div>

          {/* Suggestions or helper text */}
          <div className="mt-6 flex flex-wrap gap-2">
            <p className="w-full text-xs font-medium uppercase tracking-widest text-zinc-500">
              Popular searches:
            </p>
            {['Inception', 'Interstellar', 'The Matrix', 'Dune'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchQuerry(tag)
                  setQuerry(tag)
                }}
                className="
                  rounded-full
                  border
                  border-zinc-700
                  bg-zinc-900/50
                  px-4
                  py-2
                  text-xs
                  font-medium
                  text-zinc-300
                  transition-all
                  hover:border-[#F5C518]
                  hover:bg-zinc-800
                  hover:text-[#F5C518]
                "
              >
                {tag}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  )
}

export default Search