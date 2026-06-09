import { expect, test } from '@playwright/test'
import { HomePage } from '../pages/HomePage'


test.describe("search function", () => {


  test("search test with mocking api", async ({ page }) => {

    // ✅ Correct URL pattern — matches all TMDB movie API calls
    await page.route("**/search/movie**", async route => {

      const fakeData = {

        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          results: [{
            id: 123,
            title: "Mock Movie",
            overview: "This is a mock movie for testing purposes.",
            release_date: "2024-01-01",
            poster_path: "/mock-movie-poster.jpg",
            vote_average: 8.0,      // likely required
            vote_count: 100,        // likely required
            genre_ids: [28, 12],    // likely required
            popularity: 100,
            adult: false,
            original_language: "en",
            backdrop_path: "/mock-backdrop.jpg"
          }],
          total_pages: 1,
          total_results: 1,
          page: 1
        })
      }

      await route.fulfill(fakeData)
    })

    const homePage = new HomePage(page)
    await homePage.goto()                    // ✅ await

    await homePage.searchBar.fill("Mock Movie")
    await homePage.searchButton.click()

    await expect(homePage.movieCard.filter({
      hasText: 'Mock Movie'                    // ✅ appears because mock returns all movies
    })).toBeVisible()
  })


})

