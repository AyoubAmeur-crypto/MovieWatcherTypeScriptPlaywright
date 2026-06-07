import { test, expect } from '@playwright/test'



test.describe("HomePagev2", () => {

    test.beforeEach(async ({ page }) => {

        await page.goto("http://localhost:5173")


        //locators

        await page.getByTestId("login-username").fill("user1234")
        await page.getByTestId("login-password").fill("password")
        await page.getByTestId("login-button").click()




    })

    test("check meta data and elements", async ({ page }) => {

        await expect(page.getByRole("heading", {
            name: "Discover Your Next Favorite Movie"
        })).toBeVisible()



    })


    test("check search element and meta data", async ({ page }) => {


        await expect(page.getByRole('textbox', { name: 'Search movies by title, actor' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'Search', exact: true })).toBeVisible();


    })


    test("logout", async ({ page }) => {

        await page.getByTestId('logout-button').click();


        await page.waitForURL("http://localhost:5173")
        await expect(page.getByTestId("login-username")).toBeVisible()
    })
})