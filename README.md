# Goodread Quote Scraper

Scrapes the first 5 pages of the specified author's quotes page and saves the quote, author and body to a mongo database (local or cloud).

## Object Structure

```
Quote {
text: String,
author: String,
source: String
}
```

## How to Use

Replace the below string with URL from which to copy quotes and replace the author name with the desired author's name.

```
const baseURL = "https://www.goodreads.com/author/quotes/874602.Ursula_K_Le_Guin";
const authorName = "Ursula K. Le Guin";
```

For more quotes adjust number of pages iterated over.
