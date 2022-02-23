import Book from "../../models/Book.js"
import User from "../../models/User.js"
import ReadingSession from "../../models/ReadingSession.js"

class ReadingSessionSeeder {
  static async seed() {
    const noah = await User.query().findOne({ email: "noah@email.com" })
    const cat = await Book.query().findOne({ title: "The Cat in the Hat" })
    const llama = await Book.query().findOne({ title: "Llama Llama Red Pajama" })
    const worst = await Book.query().findOne({ title: "The Worst Helper Ever" })
    const room = await Book.query().findOne({ title: "Room for Everyone" })
    const change = await Book.query().findOne({ title: "Change Sings" })
    const circle = await Book.query().findOne({ title: "Circle Under Berry" })
    const crayon = await Book.query().findOne({ title: "Harold and the Purple Crayon" })
    const caterpillar = await Book.query().findOne({ title: "The Very Hungry Caterpillar" })

    const sessionData = [
      {
        userId: noah.id,
        bookId: crayon.id,
        date: '2022-02-10',
        minutesRead: 11
      },
      {
        userId: noah.id,
        bookId: caterpillar.id,
        date: '2022-02-11',
        minutesRead: 7
      },
      {
        userId: noah.id,
        bookId: cat.id,
        date: '2022-02-12',
        minutesRead: 10
      },
      {
        userId: noah.id,
        bookId: worst.id,
        date: '2022-02-13',
        minutesRead: 11
      },
      {
        userId: noah.id,
        bookId: cat.id,
        date: '2022-02-14',
        minutesRead: 7
      },
      {
        userId: noah.id,
        bookId: llama.id,
        date: '2022-02-14',
        minutesRead: 6
      },
      {
        userId: noah.id,
        bookId: cat.id,
        date: '2022-02-15',
        minutesRead: 7
      },
      {
        userId: noah.id,
        bookId: worst.id,
        date: '2022-02-16',
        minutesRead: 9
      },
      {
        userId: noah.id,
        bookId: circle.id,
        date: '2022-02-19',
        minutesRead: 8
      },
      {
        userId: noah.id,
        bookId: worst.id,
        date: '2022-02-20',
        minutesRead: 9
      },
      {
        userId: noah.id,
        bookId: room.id,
        date: '2022-02-21',
        minutesRead: 6
      },
      {
        userId: noah.id,
        bookId: change.id,
        date: '2022-02-22',
        minutesRead: 7
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