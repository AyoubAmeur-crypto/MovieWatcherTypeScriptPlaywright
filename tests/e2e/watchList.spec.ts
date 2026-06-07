import { test, expect } from '@playwright/test'

test.describe("WatchList", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173")
    await page.getByTestId("login-username").fill("user1234")
    await page.getByTestId("login-password").fill("password")
    await page.getByTestId("login-button").click()
  })

  test("add Element in Watch List", { tag: "@add" }, async ({ page }) => {
    await page.getByTestId('watchlist-input').fill("Movie 4")
    await page.getByTestId('add-button').click()
    await expect(page.getByText("Movie 4")).toBeVisible()
  })

})