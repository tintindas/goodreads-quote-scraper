const puppeteer = require('puppeteer')
const axios = require('axios')
const $ = require('cheerio')

const getUrlByAuthorName = async (author) => {
  try {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto('https://www.goodreads.com/quotes/')

    let searchBar = await page.$x('//*[@id="explore_search_query"]')
    searchBar = searchBar[0]

    await searchBar.focus()
    await searchBar.type(author)
    await page.keyboard.press('Enter')

    await page.waitForNavigation()

    let next = await page.$x(
      '/html/body/div[2]/div[3]/div[1]/div[1]/div[2]/div[22]/div/a[11]'
    )
    next = next[0]

    await next.click()
    await page.waitForNavigation()

    const url = page.url()

    await browser.close()

    return url
  } catch (err) {
    console.error(err)
  }
}

module.exports = { getUrlByAuthorName }
