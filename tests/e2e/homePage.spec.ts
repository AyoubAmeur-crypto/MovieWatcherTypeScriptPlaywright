import {test,expect} from '@playwright/test'


test.describe("home Page",()=>{


    test.beforeEach(async({page})=>{
        await page.goto("http://localhost:5173")
        await page.getByTestId("login-username").fill("user1234")
        await page.getByTestId("login-password").fill("password")
        await page.getByTestId("login-button").click()
    })


    test("check metaData and elements",async ({page})=>{


        await page.getByRole('heading', { name: 'Discover Your Next Favorite' }).click();
})


    test("check movie render correctly",async ({page})=>{

        await page.getByRole('link').filter({
            hasText:'Obsession'
        }).click()


        await expect(page.getByRole("button",{
            name:'Back to Movies'
        })).toBeVisible()


      
    })






})