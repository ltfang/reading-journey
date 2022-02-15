import Book from "../src/models/Book.js"

class BookSerializer {
  static getSummary(book) {
    const allowedAttributes = ["id", "author", "title", "thumbnailUrl"]
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
}

export default BookSerializer