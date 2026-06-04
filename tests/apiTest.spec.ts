import  {test,expect}  from '@playwright/test'
import { exitCode } from 'process'


const token = process.env.VITE_TMDB_TOKEN


test.describe("test the TMDB api",()=>{

    test("trendy movie",async ({request})=>{


        const response = await request.get("https://api.themoviedb.org/3/movie/popular?page=1",{

            headers:{Authorization: `Bearer ${token}`}
        })

        expect(response.status()).toBe(200)

        const body = await response.json()

        expect(body).toHaveProperty('results')

        expect(body.results.length).toBeGreaterThanOrEqual(1)
        expect(body.results[0]).toHaveProperty('id')
        expect(body.results[0]).toHaveProperty('adult')
        expect(body.results[0]).toHaveProperty('popularity')



        




    })


    test("search query",async ({request})=>{


        const response = await request.get("https://api.themoviedb.org/3/search/movie?query=test&page=1",{

            headers:{Authorization: `Bearer ${token}`}
            
            
        })

        expect(response.status()).toBe(200)

        const body = await response.json()

        

        expect(body).toHaveProperty('results')

        expect(body.results[0]).toHaveProperty('id')
        expect(body.results[0]).toHaveProperty('adult')
        expect(body.results[0]).toHaveProperty('popularity')


    })
})
