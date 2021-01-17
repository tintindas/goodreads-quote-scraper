const { saveToDB } = require('./db')
const { getUrlByAuthorName, getQuotes } = require('./scrape')

const scrape = async (author) => {
	try {
		const url = await getUrlByAuthorName('jeffrey archer')
		const quotes = await getQuotes(url)
		await saveToDB(quotes)
		console.log('Done')
	} catch (err) {
		console.error(err)
	}
}
