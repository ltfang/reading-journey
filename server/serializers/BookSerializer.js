class BookSerializer {
  static getSummary(book) {
    const allowedAttributes = ["id", "author", "title", "thumbnailUrl"]
    let serializedBook = {}
    for (const attribute of allowedAttributes) {
      serializedBook[attribute] = book[attribute]
    }
    return serializedBook
  }
}

export default BookSerializer