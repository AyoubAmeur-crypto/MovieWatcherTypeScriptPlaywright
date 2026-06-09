import {expect, test} from '@playwright/test'
import { HomePage } from '../pages/HomePage'


test.describe("watchlist",()=>{


  test("add element in watchlist",async ({page})=>{


    const homePage = new HomePage(page)
     
    await homePage.goto()

     homePage.addToWatchList("Watchlist 1")
     
    const watchlistTitle = page.getByText("Watchlist 1")

    await expect(homePage.watchListitem.filter({
      hasText:"Watchlist 1"
    })).toBeVisible()
  })


  test("remove element from watchlist",async ({page})=>{

    const homePage = new HomePage(page)

    await homePage.goto()

    const title = "Watchlist 1"

    homePage.addToWatchList(title)
    await expect(homePage.watchListitem.filter({
      hasText:title
    })).toBeVisible()

    const watchlistItems = homePage.watchListitem

    const targetItem = watchlistItems.filter({
      hasText:title
    })

    await targetItem.hover()
    await targetItem.getByRole("button",{
      name:'Remove from watchlist'
    }).click()

    await expect(targetItem).toBeHidden()


  })
})