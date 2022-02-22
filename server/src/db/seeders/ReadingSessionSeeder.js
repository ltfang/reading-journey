import Book from "../../models/Book.js"
import User from "../../models/User.js"
import ReadingSession from "../../models/ReadingSession.js"

class ReadingSessionSeeder {
  static async seed() {
    const lilly = await User.query().findOne({ email: "lilly@lilly.com" })
    const cat = await Book.query().findOne({ title: "The Cat in the Hat" })
    const llama = await Book.query().findOne({ title: "Llama Llama Red Pajama" })
    const worst = await Book.query().findOne({ title: "The Worst Helper Ever" })
    const room = await Book.query().findOne({ title: "Room for Everyone" })
    const change = await Book.query().findOne({ title: "Change Sings" })
    const circle = await Book.query().findOne({ title: "Circle Under Berry" })

    const sessionData = [
      {
        userId: lilly.id,
        bookId: cat.id,
        date: '2022-02-14',
        minutesRead: 5
      },
      {
        userId: lilly.id,
        bookId: llama.id,
        date: '2022-02-14',
        minutesRead: 6
      },
      {
        userId: lilly.id,
        bookId: cat.id,
        date: '2022-02-15',
        minutesRead: 7
      },
      {
        userId: lilly.id,
        bookId: worst.id,
        date: '2022-02-16',
        minutesRead: 9
      },
      {
        userId: lilly.id,
        bookId: circle.id,
        date: '2022-02-19',
        minutesRead: 5
      },
      {
        userId: lilly.id,
        bookId: worst.id,
        date: '2022-02-20',
        minutesRead: 8
      },
      {
        userId: lilly.id,
        bookId: room.id,
        date: '2022-02-21',
        minutesRead: 5
      },
      {
        userId: lilly.id,
        bookId: change.id,
        date: '2022-02-22',
        minutesRead: 6
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