import {test,Locator, Page} from '@playwright/test'



export class HomePage {



  readonly page:Page
  readonly homePageHeading:Locator
  readonly searchBar:Locator
  readonly searchButton:Locator
  readonly watchListInput:Locator
  readonly watchlistButton:Locator
  readonly logoutButton:Locator
  readonly movieCard:Locator
  readonly pageNext:Locator
  readonly pagePrevious:Locator
  readonly watchListitem:Locator


  constructor(page:Page){


    this.page=page
    this.homePageHeading=page.getByRole('heading', { name: 'Discover Your Next Favorite' })
    this.searchBar=  page.getByRole('textbox', { name: 'Search movies by title, actor' })
    this.searchButton=page.getByRole('button', { name: 'Search', exact: true })
    this.watchListInput=page.getByTestId('watchlist-input')
    this.watchlistButton=page.getByTestId('add-button')
    this.logoutButton=page.getByTestId("logout-button")
    this.movieCard=page.getByTestId("movieCard")
    this.pagePrevious=page.getByRole('button', { name: 'Previous Page' })
    this.pageNext=page.getByRole('button', { name: 'Next page' })
    this.watchListitem=page.getByTestId("watchlist-item")




    

  }

  
async goto(){

  await this.page.goto("/home")
}

  async logout(){

    await this.logoutButton.click()
  }


   searchMovie(title:string){

    this.searchBar.fill(title)
    this.searchButton.click()
  }


  addToWatchList(title:string){


     this.watchListInput.fill(title)
     this.watchlistButton.click()
  }


  pressOnPageNext(){

    this.pageNext.click()
  }

  pressOnPagePrevious(){

    this.pagePrevious.click()
  }


  async clickMovieCard(title:string){


    await this.movieCard.filter({
      hasText:title
    }).click()


  }




  


}