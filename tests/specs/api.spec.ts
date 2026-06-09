import {
  expect,
test
} from '@playwright/test'

import dotenv from 'dotenv'

dotenv.config()

const trendy_movie = process.env.TRENDY_MOVIE || ''
const query_movie = process.env.QUERRY_MOVIE
const token = process.env.VITE_TMDB_TOKEN



test.describe("fetch data from IMDB api",()=>{


  test("get trendy movies",async ({request})=>{


    const response = await request.get(trendy_movie+'?page=1',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

    const body = await response.json()


    expect(response.status()).toBe(200)

    expect(body).toHaveProperty("results")
        expect(body.results[0]).toHaveProperty('overview')
            expect(body.results[0]).toHaveProperty('title')



  })


    test("search  movies",async ({request})=>{


    const response = await request.get(query_movie+'?page=1&query=Inception',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

    const body = await response.json()


    expect(response.status()).toBe(200)

    expect(body).toHaveProperty("results")
        expect(body.results[0]).toHaveProperty('overview')
            expect(body.results[0]).toHaveProperty('title')



  })
})