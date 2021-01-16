require('dotenv').config()
const mongoose = require('mongoose')

// Connect to Database
const connectToDB = async () => {
  const user = process.env.DB_USER
  const password = process.env.DB_PASSWORD
  const dbName = process.env.DB_NAME

  const db = await mongoose.connect(
    `mongodb+srv://${user}:${password}@cluster0.yo7rn.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )

  return db
}

// Define Schema
const Schema = mongoose.Schema

const quoteSchema = new Schema({
  text: String,
  author: String,
  source: String
})

const Quote = new mongoose.model('Quote', quoteSchema)

const saveToDB = async (quotes) => {
  quotes.forEach((item) => {
    const quote = new Quote(item)
    await quote.save()
  })
}

module.exports = {saveToDB, connectToDB, Quote}