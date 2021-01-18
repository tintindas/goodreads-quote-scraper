const { saveToDB } = require('./db')
const { getUrlByAuthorName, getQuotes } = require('./scrape')
const inquirer = require('inquirer')

const scrape = async (author, numberOfPages) => {
	try {
		const url = await getUrlByAuthorName(author)
		const quotes = await getQuotes(url, numberOfPages)
		await saveToDB(quotes)
		console.log('Done')
	} catch (err) {
		console.error(err)
	}
}

inquirer
	.prompt([
		{
			name: 'author',
			message: 'Enter name of author: ',
			validate: (input) => {
				return input ? true : false
			}
		},
		{
			name: 'numberOfPages',
			message: 'Enter number of pages to scrape: ',
			default: 5
		}
	])
	.then(({ author, numberOfPages }) => {
		if (numberOfPages) {
			console.log('Starting scraper')
			scrape(author, numberOfPages)
		} else {
			scrape(author)
		}
	})
	.catch((err) => {
		console.error(err)
	})
