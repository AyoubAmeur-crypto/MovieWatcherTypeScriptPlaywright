import { test, expect } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

const token = process.env.VITE_TMDB_TOKEN

test.describe("TMDB API", () => {

    test("fetches popular movies", async ({ request }) => {

        const response = await request.get("https://api.themoviedb.org/3/movie/popular?page=1", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        expect(response.status()).toBe(200)

        const body = await response.json()

        expect(body).toHaveProperty("results")
        expect(body.results.length).toBeGreaterThanOrEqual(1)
        expect(body.results[0]).toHaveProperty("title")
        expect(body.results[0]).toHaveProperty("overview")
    })

})      