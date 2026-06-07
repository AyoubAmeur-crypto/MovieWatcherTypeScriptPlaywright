import { test, expect } from '@playwright/test'


test.describe("mock the movie api", () => {


    test("empty movies list",async ({page})=>{


        await page.route("**/movie/popular**",async route => {


            const fakeData = {


                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    results: [],
                    total_pages: 1,
                    total_results: 0,
                    page: 1
                })


            }

            await route.fulfill(fakeData)
        })

        await page.goto("http://localhost:5173")
            await page.getByTestId('login-username').fill('user1234');
            await page.getByTestId('login-password').fill('password');


            await Promise.all([
                page.getByTestId('login-button').click(),
                page.waitForURL("**/home")
            ])


            await expect(page.getByRole("heading",{
                name:"No Movies Found"
            })).toBeVisible()
    })



    test("fetch fake data", { tag: "@Mocking" }, async ({ page }) => {


       await  page.route("**/movie/popular**", async route => {

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


         await page.goto("http://localhost:5173")
            await page.getByTestId('login-username').fill('user1234');
            await page.getByTestId('login-password').fill('password');


            await Promise.all([
                page.getByTestId('login-button').click(),
                page.waitForURL("**/home")
            ])

            await expect(page.getByRole('link').filter({ hasText: 'Mock Movie' })).toBeVisible();




    })



    test("fetch with search bar", { tag: "@Mocking" }, async ({ page }) => {


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


         await page.goto("http://localhost:5173")
            await page.getByTestId('login-username').fill('user1234');
            await page.getByTestId('login-password').fill('password');


            await Promise.all([
                page.getByTestId('login-button').click(),
                page.waitForURL("**/home")
            ])

await page.getByPlaceholder("Search movies by title, actor, director...").fill("Mock Movie")
await page.getByRole('button', { name: 'Search', exact: true }).click()


            await expect(page.getByRole('link').filter({ hasText: 'Mock Movie' })).toBeVisible();







    })




})

