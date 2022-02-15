import Book from "../../models/Book.js"

class BookSeeder {
  static async seed() {
    const bookData = [
      {
        googleBooksId: "ia7xAwAAQBAJ",
        author: "Theodor Suess Geisel",
        title: "The Cat in the Hat",
        thumbnailUrl: "https://books.google.com/books/content?id=ia7xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
      },
      {
        googleBooksId: "KUTZoAEACAAJ",
        author: "Anna Dewdney",
        title: "Llama Llama Red Pajama",
        thumbnailUrl: "http://books.google.com/books/content?id=KUTZoAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
      },
      {
        googleBooksId: "yQogvgAACAAJ",
        author: "Julia Donaldson, Axel Scheffler",
        title: "The Gruffalo",
        thumbnailUrl: "http://books.google.com/books/content?id=FeulzQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
      }
    ]
    
    for (const singleBook of bookData) {
      const currentBook = await Book.query().findOne(singleBook)
      if (!currentBook) {
        await Book.query().insert(singleBook)
      }
    }
  }
}

export default BookSeeder