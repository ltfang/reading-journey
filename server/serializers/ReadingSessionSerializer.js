import BookSerializer from "./BookSerializer.js"
import { DateTime, Interval } from "luxon"
import User from "../src/models/User.js"

class ReadingSessionSerializer {
  static async getDetails(readingSession) {
    const allowedAttributes = ["id", "date", "minutesRead", "userId", "bookId"]
    let serializedReadingSession = {}
    for (const attribute of allowedAttributes) {
      serializedReadingSession[attribute] = readingSession[attribute]
    }
    const book = await readingSession.$relatedQuery("book")
    const serializedBook = BookSerializer.getSummary(book)
    serializedReadingSession.book = serializedBook
    return serializedReadingSession
  }

  static async getReadingSessions(readingSessions, userId, date) {
    const filteredReadingSessions = readingSessions.filter(readingSession => {
      return readingSession.userId === userId && readingSession.date.toLocaleDateString() === date
    })
    const serializedReadingSessions = await Promise.all(filteredReadingSessions.map(async (readingSession) => {
      return await ReadingSessionSerializer.getDetails(readingSession)
    }))
    return serializedReadingSessions
  }

  static getTotalMinutes(readingSessions) {
    return readingSessions.reduce((prev, current) => {
      return prev+current.minutesRead 
    }, 0)
  }

  static async getDailyMinutes(startDate, endDate, userId) {
    const user = await User.query().findById(userId)
    let interval = Interval.fromDateTimes(startDate, endDate)
    const readingSessions = await user.$relatedQuery("readingSessions")
    const dailyMinutesArray = interval.splitBy({days:1}).map(d => {
      const dailyReadingSessions = readingSessions.filter(readingSession => {
        return readingSession.date.toISOString().substring(0,10) === d.start.toFormat('yyyy-MM-dd')
      })
      const formattedDate = d.start.toFormat('yyyyMMdd')
      const totalMinutes = ReadingSessionSerializer.getTotalMinutes(dailyReadingSessions)
      return {  
        [formattedDate]: totalMinutes
      }
    })
    return dailyMinutesArray
  }
}

export default ReadingSessionSerializer