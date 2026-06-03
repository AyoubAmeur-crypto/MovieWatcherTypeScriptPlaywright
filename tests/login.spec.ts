import {test,expect} from '@playwright/test'


test.describe("Login Form",()=>{



    test.beforeEach(async ({page})=> {
        await page.goto("http://localhost:5173")
    })


    // test.only("check elements & metadeta",async ({page})=>{

    //     test.slow()

    //     await expect(page.getByRole("heading",{
    //         name:"Your watchlist, your world."
    //     })).toBeVisible()
    // })

    // test.only("check elements & metadeta",async ({page})=>{

    //     test.setTimeout(3000)

    //     await expect(page.getByRole("heading",{
    //         name:"Your watchlist, your world."
    //     })).toBeVisible()
    // })


    test("check elements & metadeta",{
        annotation:{
              type:"issue",
              description:"check if all details are here"
        }
    },async ({page})=>{



        await expect(page.getByRole("heading",{
            name:"Your watchlist, your world."
        })).toBeVisible()
    })
    



    test("test the auth flow",{
        tag:"@backlog"
    },async ({page})=>{


        await page.getByTestId("login-username").fill("user1234")
        await page.getByTestId("login-password").fill("password")

        await page.getByTestId("login-button").click()

        await expect(page.getByRole("heading",{
            name:"Discover Your Next Favorite Movie"
        })).toBeVisible()



    })


})