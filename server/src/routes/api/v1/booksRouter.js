import express from "express"
import BookSerializer from "../../../../serializers/BookSerializer.js"
import { User } from "../../../models/index.js"

const booksRouter = new express.Router()

booksRouter.get("/search", async (req, res) => {
  try {
    const searchTerms = req.query.searchTerms
    const books = await BookSerializer.getUserBooks(req.user.id)
    const searchedBookData = BookSerializer.searchBookTitles(books, searchTerms) 
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json( searchedBookData )
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default booksRouter