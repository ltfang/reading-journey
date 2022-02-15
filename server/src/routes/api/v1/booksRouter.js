import express from "express"
import GoogleBooksClient from "../../../apiClient/GoogleBooksClient.js"
import BookSerializer from "../../../../serializers/BookSerializer.js"

const booksRouter = new express.Router()

booksRouter.get("/", async (req, res) => {
  const searchTerms = req.query.searchTerms
  try {
    const response = await GoogleBooksClient.getBooks(searchTerms)
    const fullBookData = JSON.parse(response)
    const bookData = BookSerializer.summarizeGoogleBooksData(fullBookData)
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json(bookData)
  } catch (error) {
    return res.status(401).json({ errors: error })
  }
})

export default booksRouter