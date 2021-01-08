require('dotenv').config()
const mongoose = require('mongoose')

// Connect to Database
const connectToDB = async () => {
  const db = await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yo7rn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
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

module.exports = { Quote, connectToDB }

connectToDB()
