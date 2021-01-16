require('dotenv').config()
const mongoose = require('mongoose')

// Define Schema
const Schema = mongoose.Schema

const quoteSchema = new Schema({
  quoteText: String,
  author: String,
  source: String
})

const Quote = new mongoose.model('Quote', quoteSchema)

const saveToDB = async (quotes) => {
  const user = process.env.DB_USER
  const password = process.env.DB_PASSWORD
  const dbName = process.env.DB_NAME

  await mongoose.connect(
    `mongodb+srv://${user}:${password}@cluster0.yo7rn.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )

  quotes.forEach(async (item) => {
    const quote = new Quote(item)
    await quote.save()
  })
}

module.exports = { saveToDB }
