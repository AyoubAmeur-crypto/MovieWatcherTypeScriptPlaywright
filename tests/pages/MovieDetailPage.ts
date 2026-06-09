import {Locator ,Page} from '@playwright/test'



export class MovieDetailPage {


  readonly page:Page
  readonly movieTitle:Locator
  readonly BackButton:Locator


  constructor(page:Page){

    this.page=page
    this.movieTitle=page.getByTestId("movieTitle")
      this.BackButton=page.getByRole("button",{
        name:"Back to Movies"
      })
    
  }


  async goto(){

    await this.page.goto("/")
  }

  async checkMovieDetails(){

    this.page.getByTestId("movieCard").click()
    await this.page.waitForURL("/home/**")


    
  }


}