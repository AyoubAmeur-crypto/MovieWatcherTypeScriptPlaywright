import {test,expect} from '@playwright/test'


test.describe("mock movie api",()=>{


    test.beforeEach(async ({page})=>{

        await page.goto("http://localhost:5173")
    })


    test("fetch fake data",async({page})=>{

        // Mock the popular movies endpoint
        await page.pause()
        await page.route("**/3/movie/popular**", async route => {
            const fakeData = {
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    page: 1,
                    total_pages: 1,
                    total_results: 2,
                    results: [
                        { id: 1, title: 'Fake Movie', poster_path: '/fake.jpg', vote_average: 8.5 },
                        { id: 2, title: 'Another Movie', poster_path: '/fake2.jpg', vote_average: 7.0 },
                    ]
                })
            }
            await route.fulfill(fakeData)
        })

        await page.getByTestId("login-username").fill("user1234")
        await page.getByTestId("login-password").fill("password")
        await page.getByTestId("login-button").click()

        await expect(page.getByText("Fake Movie")).toBeVisible()
        await expect(page.getByText("Another Movie")).toBeVisible()

    })

    })