import Book from "../../models/Book.js"
import User from "../../models/User.js"
import ReadingSession from "../../models/ReadingSession.js"

class ReadingSessionSeeder {
  static async seed() {
    const noah = await User.query().findOne({ email: "noah@noah.com" })
    const cat = await Book.query().findOne({ title: "The Cat in the Hat" })
    const llama = await Book.query().findOne({ title: "Llama Llama Red Pajama" })
    const gruffalo = await Book.query().findOne({ title: "The Gruffalo" })

    const sessionData = [
      {
        userId: noah.id,
        bookId: cat.id,
        date: '2022-02-14',
        minutesRead: 10
      },
      {
        userId: noah.id,
        bookId: llama.id,
        date: '2022-02-14',
        minutesRead: 8
      }
    ]

    for (const singleSession of sessionData) {
      const currentSession = await ReadingSession.query().findOne(singleSession)
      if (!currentSession) {
        await ReadingSession.query().insert(singleSession)
      }
    }
  }
}

export default ReadingSessionSeeder