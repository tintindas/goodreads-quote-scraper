const { saveToDB } = require('./db')
const { getUrlByAuthorName, getQuotes } = require('./scrape')

;(async () => {
  const url = await getUrlByAuthorName('neil gaiman')
  const quotes = await getQuotes(url)
  await saveToDB(quotes)
  console.log('Done')
})()
