import {test as setup} from '@playwright/test'

import dotenv from 'dotenv'
const STORAGE_STATE = 'playwright/.auth/user.json';


dotenv.config()


setup("authentication",async ({page})=>{




  await page.goto("/")

  await page.getByTestId("login-username").fill(process.env.TEST_USERNAME || '')
  await page.getByTestId("login-password").fill(process.env.TEST_PASSWORD || '')

    await page.getByTestId('login-button').click();


  await page.waitForURL("/home")

  await page.context().storageState({
    path: STORAGE_STATE,
  });

})