import { test, expect } from '@playwright/test';


test.describe("Home Page",()=>{

  test.beforeEach(async ({page})=> {

      await page.goto("http://localhost:5173")

  })

test("should have correct metadata and elements",async ({page})=>{


  await expect(page).toHaveTitle("moviewatcher")

  await expect(
    page.getByRole("heading", {
      name: "Discover Your Next Favorite Movie"
    })).toBeVisible()

    await expect(
      page.getByRole("button",{
      name:"Search Movies"
    })).toBeVisible()


    await expect(
      page.getByRole("button",{
      name:"Browse Top Rated"
    })).toBeVisible()


})


test("should redirect to films card",async ({page})=>{

  {/** 
    
    await page.getByRole("button",{
      name:"Search Movies"
    }).click()


  await expect(
     page.getByRole("heading",{
    name:"Find Your Next Favorite"
  })
  ).toBeVisible()
    */}  



    await Promise.all(
      
      [page.waitForURL("**/movie/**"),
      
      page.getByTestId("movieCard").first().click()



      ]

    )

    await expect(page.getByRole("button",{
      name:"Back to Movies"
    })).toBeVisible()


})

})