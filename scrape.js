const puppeteer = require('puppeteer')
const axios = require('axios')
const cheerio = require('cheerio')

const getUrlByAuthorName = async (author) => {
	try {
		const browser = await puppeteer.launch()
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
// For testing
// https://www.goodreads.com/quotes/search?commit=Search&page=2&q=neil+gaiman&utf8=%E2%9C%93

const getQuotes = async (url, numberOfPages = 5) => {
	const baseUrl = url.replace('page=2', 'page=<pageNumber>')

	const quotes = []

	try {
		for (let i = 1; i <= numberOfPages; i++) {
			const url = baseUrl.replace('<pageNumber>', i.toString())

			const res = await axios.get(url)
			const $ = cheerio.load(res.data) // $ === res.body basically

			// cheerio does not seem to support arrow functions PLEASE DO NOT CHANGE FUNCTION SYNTAX
			$('.quoteDetails').each(function () {
				let quoteText = $(this).find('div[class=quoteText]').text() // get innerText
				quoteText = quoteText.substr(0, quoteText.indexOf('―')).trim() // get only quoteText
				quoteText = quoteText.substr(1, quoteText.length) // trim off inverted commas from start and end
				const author = $(this).find('span[class=authorOrTitle]').text().trim() // get author name
				let source = $(this).find('a[class=authorOrTitle]')
				source = source ? source.text().trim() : null // if source does not exist return null

				//Get tags
				let tags = $(this).find('.greyText.smallText.left').text().trim() // select concerned HTML Element
				tags = tags.split(':') // get rid of starting "tag:"
				tags = tags.slice(1) // get everything except "tag:"

				// for non empty tag lists
				if (tags.length) {
					tags = tags[0].split(',') // get individual tags
					tags = tags.map((tag) => {
						return tag.trim() // strip whitespace
					})
				}

				quotes.push({ quoteText, author, source, tags })
			})

			break
		}
	} catch (err) {
		console.error(err)
	}
	return quotes
}

module.exports = { getUrlByAuthorName, getQuotes }

// ;(async () => console.log(await getUrlByAuthorName('neil gaiman')))()
// modifyURL(
//   'https://www.goodreads.com/quotes/search?commit=Search&page=2&q=neil+gaiman&utf8=%E2%9C%93'
// )

getQuotes(
	'https://www.goodreads.com/quotes/search?commit=Search&page=2&q=neil+gaiman&utf8=%E2%9C%93',
	5
)
