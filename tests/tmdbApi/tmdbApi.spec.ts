import {test,expect} from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

const token = process.env.VITE_TMDB_TOKEN

test.describe("test IMDB Api",()=>{


    test("fetch popular movies",async ({request})=>{


        const reponse = await request.get("https://api.themoviedb.org/3/movie/popular?page=1",{
            headers:{
                authorization:`Bearer ${token}`
            }
        })

        expect(reponse.status()).toBe(200)

        const body = await reponse.json()

        expect(body).toHaveProperty("results")

        expect(body.results.length).toBeGreaterThan(0)

        expect(body.results[0]).toHaveProperty("title")
        expect(body.results[0]).toHaveProperty("overview")
        expect(body.results[0]).toHaveProperty("release_date")
        expect(body.results[0]).toHaveProperty("poster_path") 
    })


    test("fetch search Movies",{
        annotation:{
            type:"api",
            description:"teting get endpoint , it works correctly"
        }
    },async ({request})=>{

        const response = await request.get("https://api.themoviedb.org/3/search/movie?query=test1&page=1",{
             headers:{
                authorization:`Bearer ${token}`
            }
        })

        const body = await response.json()


        expect(body).toHaveProperty("results")

        expect(body.results.length).toBeGreaterThanOrEqual(1)

        expect(body.results[0]).toHaveProperty("title")
         expect(body.results[0]).toHaveProperty("overview")
        expect(body.results[0]).toHaveProperty("release_date")
        expect(body.results[0]).toHaveProperty("poster_path") 



    })

})