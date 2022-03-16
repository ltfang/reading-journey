import Book from "../src/models/Book.js"
import Profile from "../src/models/Profile.js"
import ReadingSessionSerializer from "./ReadingSessionSerializer.js"
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
      let thumbnail = book.volumeInfo.imageLinks?.thumbnail
      if (!thumbnail) {
        thumbnail = 'https://upload.wikimedia.org/wikipedia/commons/9/92/BookIcon.png'
      }
      return {
        googleBooksId: book.id, 
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        thumbnailUrl: thumbnail
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

  static async getProfileBooks(profileId) {
    const profile = await Profile.query().findById(profileId)
    const books = await profile.$relatedQuery("books").distinctOn("id")
    const serializedBooks = books.map(book => BookSerializer.getSummary(book))
    const booksWithLastRead = await Promise.all(serializedBooks.map(async book => {
      book.lastDateRead = await ReadingSessionSerializer.getLastDateRead(book.id, profileId)
      return book
    }))
    const orderedBooks = _.orderBy(booksWithLastRead, ['lastDateRead', 'title'], ['desc', 'asc'])
    return orderedBooks
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