const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/quotesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
  text: String,
  author: String,
  source: String
});

const Quote = new mongoose.model("Quote", quoteSchema);

for (let i = 1; i <= 5; i++) {
  //Navigate to Goodreads quotes page to get base URL, copy and paste here
  const baseURL = "https://www.goodreads.com/author/quotes/1654.Terry_Pratchett";
  const authorName = "Terry Pratchett"
  let url = baseURL + "?page=" + String(i);

  request(url, function(err, res, body) {

    const $ = cheerio.load(body);

    let quoteElements = [];

    $(".quoteText").each(function() {
      quoteElements.push($(this).text());
    });


    quoteElements.forEach(element => {
      let quoteText = element.substr(0, element.indexOf("―"));
      quoteText = quoteText.trim();
      const offset = authorName.length + 11; // Offset calculated as length of author name
      let quoteSource = element.substr(element.indexOf("―") + offset);
      quoteSource = quoteSource.trim();


      const quote = new Quote({
        text: quoteText,
        author: authorName, // Replace with author Name
        source: quoteSource //Replace with source
      });

      quote.save();
    });

  });
}
