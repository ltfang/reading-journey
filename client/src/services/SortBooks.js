class SortBooks {

  static sortByTitle(books) {
    const modTitleBooks = books.map(book => {
      let modTitle = book.title
      if (modTitle.substring(0, 4) === "The ") {
        modTitle = modTitle.substring(4, modTitle.length)
      }
      book.modTitle = modTitle
      return book
    })
    const orderedBooks = _.orderBy(modTitleBooks, "modTitle")
    return orderedBooks
  }

  static sortByAuthor(books) {
    //refactor to take into account Grosset & Dunlap, Editors of Webster's
    const booksWithLastName = books.map(book => {
      let authorLastName
      let commaIndex = book.author.indexOf(',')
      if (commaIndex > -1) {
        let regex = /[a-zA-z\-]*,/
        let lastNameIndex = book.author.search(regex)
        authorLastName = book.author.substring(lastNameIndex, commaIndex)
      } else {
        let regex = /[a-zA-Z\-]*$/
        let lastNameIndex = book.author.search
        (regex)
        authorLastName=book.author.substring(lastNameIndex, book.author.length)
      }
      book.authorLastName=authorLastName
      return book
    })
    const orderedBooks = _.orderBy(booksWithLastName, ["authorLastName", "title"])
    return orderedBooks
  }

}

export default SortBooks