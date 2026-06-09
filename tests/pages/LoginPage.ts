import {expect, Locator, Page} from '@playwright/test'


import dotenv from 'dotenv'


dotenv.config()

export class LoginPage{



  readonly page:Page
  readonly userNameInput:Locator
  readonly userNamePassword:Locator
  readonly loginButton:Locator
  readonly errorMessage:Locator





  constructor(page:Page){

    this.page=page
    this.userNameInput=page.getByTestId('login-username')
    this.userNamePassword=page.getByTestId("login-password")
    this.loginButton=page.getByTestId("login-button")
    this.errorMessage=page.getByTestId('login-error')
  }

  async goto(){
    await this.page.goto("/")

  }

  async login(userName:string,password:string){


    await this.userNameInput.fill(userName)
    await this.userNamePassword.fill(password)
    await this.loginButton.click()

    if(await this.errorMessage.isHidden())

    await this.page.waitForURL("/home")
  
  }
}