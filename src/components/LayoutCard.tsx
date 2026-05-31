import React, { useEffect, useState } from 'react'
import type { ApiResponse } from '../types/movie'
import { useFetch } from '../customHooks/useFetch'
import MovieCard from './MovieCard'
import Pagination from './Pagination'
import { useMovieStore } from '../zustand/movieStore'

function LayoutCard() {

  const {page,querry,setIncrementPage} = useMovieStore()

    const [movieDetails,setMovieDetails]=useState<ApiResponse>()
    const [loading,setLoading]=useState<Boolean>(false)
    
    // Reset page to 1 when query changes
    useEffect(() => {
      if (querry) {
        setIncrementPage(0) // Reset to page 1
      }
    }, [querry, setIncrementPage])
    
    // Conditional URL based on whether there's a search query
    const url:string = querry 
      ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(querry)}&page=${page}`
      : `https://api.themoviedb.org/3/movie/popular?page=${page}`

    const fetchDataFromApi = async (url:string)=>{

        setLoading(true)
        try {

            const data = await useFetch(url)

            console.log("check heere ???");
            

            if(data){

                setMovieDetails({
                    results:data?.results,
                    page:data?.page,
                    total_pages:data?.total_pages,
                    total_results:data?.total_results 
                })

            }
            


            
        } catch (error) {
            console.log("there is a problem loading data from api",error);

            setLoading(false)
            
        }finally{

            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchDataFromApi(url)
    },[page,querry])


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
    </div>
 
    
  )
)
}

export default LayoutCard