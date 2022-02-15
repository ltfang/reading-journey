import BookSerializer from "./BookSerializer.js"

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
}

export default ReadingSessionSerializer