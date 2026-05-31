import React from 'react'
import type { ApiResponse, Movie } from '../types/movie'
import axios from 'axios'


const token = import.meta.env.VITE_TMDB_TOKEN

export const useFetch = async (url:string)=>{


    

    try {


       const results = await axios.get<ApiResponse>(url,{
        headers:{Authorization: `Bearer ${token}`}
       })

       return results.data
        
    } catch (error) {

        console.log("full error details ",error);

        throw error
        
        
    }
}