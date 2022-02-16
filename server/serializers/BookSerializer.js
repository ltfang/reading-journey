import Book from "../src/models/Book.js"
import User from "../src/models/User.js"
import _ from "lodash"

class BookSerializer {
  static getSummary(book) {
    const allowedAttributes = ["id", "googleBooksId", "author", "title", "thumbnailUrl"]
    let serializedBook = {}
    for (const attribute of allowedAttributes) {
      serializedBook[attribute] = book[attribute]
    }
    return serializedBook
  }

  static summarizeGoogleBooksData(googleResponse) {
    const bookData = googleResponse.items.map(book => {
      return {
        googleBooksId: book.id, 
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        thumbnailUrl: book.volumeInfo.imageLinks?.thumbnail
      }
    })
    return bookData
  }

  static async getBookId(book) {
    const priorBook = await Book.query().findOne({ googleBooksId: book.googleBooksId })
    if (priorBook) {
      return priorBook.id
    }
    const newBook = await Book.query().insertAndFetch(book)
    return newBook.id
  }

  static async getUserBooks(userId) {
    const user = await User.query().findById(userId)
    const books = await user.$relatedQuery("books").distinctOn("id")
    const serializedBooks = books.map(book => BookSerializer.getSummary(book))
    return serializedBooks
  } 

  static searchBookTitles(books, searchTerms) {
    const results = books.filter(book => {
      return book.title.toLowerCase().includes(searchTerms)
    })
    return results
  }

  static concatBooks(existingBookData, googleBookData) {
    let bookData = existingBookData.concat(googleBookData)
    return _.uniqBy(bookData, 'googleBooksId')
  }
}

export default BookSerializer