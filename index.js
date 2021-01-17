const { saveToDB } = require('./db')
const { getUrlByAuthorName, getQuotes } = require('./scrape')

;(async () => {
	try {
		const url = await getUrlByAuthorName('arundhati roy')
		const quotes = await getQuotes(url)
		await saveToDB(quotes)
		console.log('Done')
	} catch (err) {
		console.error(err)
	}
})()
