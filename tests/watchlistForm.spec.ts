import {test,expect} from '@playwright/test'


test.describe("MovieFormPlaylist",()=>{


    test.beforeEach(async ({page})=>{

        await page.goto("http://localhost:5173")
    })


    test("describle metaData and elements",async({page})=>{

        await expect(page.getByRole("heading",{
            name:"Watchlist"
        })).toBeVisible()
    })

    test("check if the form start with zero elements",async ({page})=>{


        await expect(page.getByText("Your watchlist is empty — add something to get started.")).toBeVisible()


        const elements = page.getByTestId("watchlist-item")
        
        const count = await elements.count()

        expect(count).toBe(0)

        
    })


    test("add first element if it added",async ({page})=> {

        const input = page.getByPlaceholder("Add a movie or show title…")

        await input.fill("movie 1")

        await page.getByTestId("add-button").click()

        await expect(page.getByText("Your watchlist is empty")).not.toBeVisible()




        await expect(page.getByTestId("watchlist-item").first()).toBeVisible()

        await expect(input).toBeEmpty()


    })

})