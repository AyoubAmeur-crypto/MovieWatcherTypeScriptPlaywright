import { expect, test } from '@playwright/test'
import dotenv from 'dotenv'
import { dot } from 'node:test/reporters'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'


dotenv.config()


const userName = process.env.TEST_USERNAME || ''

const password = process.env.TEST_PASSWORD || ''
const wrongPassword = process.env.TEST_WRONG_PASSWORD || ''


test.describe("Login", () => {


  test.use({ storageState: { cookies: [], origins: [] } });
 


  test("test successful Login", async ({ page }) => {

    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page)


    await loginPage.goto()
    console.log("check the password parsed to the function ",password);
    

    await loginPage.login(userName, password)

    await expect(homePage.homePageHeading).toBeVisible()
    










  })


  test("insert wrong password",async ({page})=>{


    const loginPage = new LoginPage(page)


    await loginPage.goto()

    await loginPage.login(userName,wrongPassword)

    await expect(loginPage.errorMessage).toBeVisible()
    
  })


  
})