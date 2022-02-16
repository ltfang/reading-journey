import express from "express"
import GoogleBooksClient from "../../../apiClient/GoogleBooksClient.js"
import BookSerializer from "../../../../serializers/BookSerializer.js"

const bookSearchRouter = new express.Router()

bookSearchRouter.get("/", async (req, res) => {
  const searchTerms = req.query.searchTerms
  try {
    const response = await GoogleBooksClient.getBooks(searchTerms)
    const fullBookData = JSON.parse(response)
    const googleBookData = BookSerializer.summarizeGoogleBooksData(fullBookData)
    const existingBooks = await BookSerializer.getUserBooks(req.user.id)
    const existingBookData = BookSerializer.searchBookTitles(existingBooks, searchTerms)
    const bookData = BookSerializer.concatBooks(existingBookData, googleBookData)
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json(bookData)
  } catch (error) {
    return res.status(401).json({ errors: error })
  }
})

export default bookSearchRouter
