import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { MovieDetailPage } from '../pages/MovieDetailPage'


test.describe("Home page", () => {


    test("check metadata & elements", async ({ page }) => {

        const homePage = new HomePage(page)
        await homePage.goto()

        await expect(homePage.homePageHeading).toBeVisible()
    })

    test("logout ", async ({ page }) => {

        const homePage = new HomePage(page)
        const loginPage = new LoginPage(page)

        await homePage.goto()


        await homePage.logout()

        await expect(loginPage.userNameInput).toBeVisible()
        await expect(loginPage.userNamePassword).toBeVisible()




    })


    test("open Movie Card", async ({ page }) => {


        const homePage = new HomePage(page)
        const title = "Obsession"
        const movieDetailPage = new MovieDetailPage(page)

        await homePage.goto()


        await homePage.clickMovieCard(title)
        await expect(movieDetailPage.BackButton).toBeVisible()


    })

    test("test next page button", async ({ page }) => {
        const homePage = new HomePage(page)

        await homePage.goto()

        if (await homePage.pageNext.isEnabled()) {
            homePage.pressOnPageNext()
            await expect(homePage.movieCard.filter({
                hasText: "Obsession"
            })).toBeHidden()
        } else {
            await expect(homePage.pageNext).toBeDisabled()
        }
    })


})