import {test,expect} from '@playwright/test'

test.describe("login Form",()=>{

    test.beforeEach(async({page})=>{
        await page.goto("http://localhost:5173")
        
    })

test("Auth Flow",async ({page})=>{


        await page.getByTestId("login-username").fill("user1234")
        await page.getByTestId("login-password").fill("password")
        await page.getByTestId("login-button").click()

        await expect(page.getByRole('heading',{
            name:'Discover Your Next Favorite Movie'
        })).toBeVisible()
})
    
})
