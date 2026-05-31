import { create } from "zustand"

type MovieStore = {

    querry:string,
    page:number,

    setQuerry:(querry:string)=>void,
    setPage: (page: number) => void  // Add this


    setIncrementPage:(page:number)=>void
    setDecremnetPage:(page:number)=>void


}


export const useMovieStore = create<MovieStore>((set)=>({

    page:1,
    querry:"",
    setQuerry:(querry:string)=>set({querry}),
    setPage:(page:number)=>set({page}),
    setDecremnetPage:(page:number)=>set({page:page-1}),
    setIncrementPage:(page:number)=>set({page:page+1})


}))