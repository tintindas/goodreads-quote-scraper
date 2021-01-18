# Goodreads Quote Scraper

Scrapes the specified author's quotes and saves the quote text, author, source and tags to a mongo database.

## Object Structure

```js
Quote {
text: String,
author: String,
source: String,
tags: Array
}
```

## Set up
1. Clone repo: `git clone https://github.com/tintindas/goodreads-quote-scraper.git`
1. Navigate into directory: `cd goodreads-quote-scraper`
1. Install dependencies: `npm install`
1. Replace the database link in [L#23](https://github.com/tintindas/goodreads-quote-scraper/blob/38ba654facc8a4809e40a75a3e3610c63e71a2c4/db.js#L23) of db.js with your own.

## How to Use

1. `npm start`
1. Provide name of author when prompted (required)
1. Provide number of pages to scrape (optional, default: 5)
