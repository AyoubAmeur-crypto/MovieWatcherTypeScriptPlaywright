import  {test,expect}  from '@playwright/test'


test.describe("test api",()=>{

    test.afterEach(async ({page})=>{

        await page.goto("http://localhost:5173")
    })


    test("fetch trendy movie",async ({page,request})=>{


        await page.getByTestId("login-username").fill("user1234")
        await page.getByTestId("login-password").fill("password")

        await page.getByTestId("login-button").click()


        const response = await request.get("https://api.themoviedb.org/3/movie/popular?page=1")


         expect(response.status()).toBe(200)

         const body = await response.json()

         expect(body).toHaveProperty('results')

         expect(body.results).toContainEqual({

            adult
: 
false
backdrop_path
: 
"/rZfmzpixLKLR3Hg2u0WgC7XLFl8.jpg"
genre_ids
: 
[27]
id
: 
1339713
original_language
: 
"en"
original_title
: 
"Obsession"
overview
: 
"After breaking the mysterious \"One Wish Willow\" to win his crush's heart, a hopeless romantic finds himself getting exactly what he asked for but soon discovers that some desires come at a dark, sinister price."
popularity
: 
592.6272
poster_path
: 
"/6X4qFYBsG3bpWDG2XIKqr04kFJa.jpg"
release_date
: 
"2026-05-13"
softcore
: 
false
title
: 
"Obsession"
video
: 
false
vote_average
: 
7.922
vote_count
: 
481
         })





    })
})