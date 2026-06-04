import {test,expect} from '@playwright/test'


test.describe("WatchList",()=>{


     test.beforeEach(async ({page})=>{

        await page.goto("http://localhost:5173")
        await page.getByTestId("login-username").fill("user1234")
        await page.getByTestId("login-password").fill("password")
        await page.getByTestId("login-button").click()
    })

    test("check if the form start with zero elements",async ({page})=>{


        await expect(page.getByText("Your watchlist is empty — add something to get started.")).toBeVisible()


        const elements = page.getByTestId("watchlist-item")
        
        const count = await elements.count()

        expect(count).toBe(0)

        
    })

    test("add element to watchlist",async ({page})=>{

          await page.getByTestId('watchlist-input').fill("test1");

          await page.getByTestId("add-button").click()


          await expect(page.getByTestId("watchlist-item").filter({
            hasText:'test1'
          })).toBeVisible()


    })
})