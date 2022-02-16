import express from "express"
import BookSerializer from "../../../../serializers/BookSerializer.js"

const booksRouter = new express.Router()

booksRouter.get("/", async (req, res) => {
  try {
    const bookData = await BookSerializer.getUserBooks(req.user.id)
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json( bookData )
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default booksRouter