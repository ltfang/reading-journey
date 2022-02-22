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
        googleBooksId: "MIqfvb202zwC",
        author: "Richard Scarry",
        title: "The Worst Helper Ever",
        thumbnailUrl: "http://books.google.com/books/content?id=MIqfvb202zwC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
      },
      {
        googleBooksId: "rLYbEAAAQBAJ",
        author: "Naaz Khan",
        title: "Room for Everyone",
        thumbnailUrl: "http://books.google.com/books/content?id=rLYbEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
      },
      {
        googleBooksId: "eZETEAAAQBAJ",
        author: "Amanda Gorman",
        title: "Change Sings",
        thumbnailUrl: "http://books.google.com/books/content?id=eZETEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
      },
      {
        googleBooksId: "2tXbzQEACAAJ",
        author: "Carter Higgins",
        title: "Circle Under Berry",
        thumbnailUrl: "http://books.google.com/books/content?id=2tXbzQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
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