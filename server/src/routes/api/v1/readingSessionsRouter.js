import express from "express"
import { ReadingSession } from "../../../models/index.js"
import ReadingSessionSerializer from "../../../../serializers/ReadingSessionSerializer.js"
import BookSerializer from "../../../../serializers/BookSerializer.js"
import { DateTime } from "luxon"

const readingSessionsRouter = new express.Router();

readingSessionsRouter.get("/:date", async (req, res) => {
  try {
    const dateObject = DateTime.fromFormat(req.params.date, 'yyyyMMdd')
    const date = dateObject.toFormat('M/dd/yyyy')
    const userId = req.user.id
    const readingSessions = await ReadingSession.query()
    const serializedReadingSessions = await ReadingSessionSerializer.getReadingSessions(readingSessions, userId, date)
    return res.status(200).json({ readingSessions: serializedReadingSessions })
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
})

readingSessionsRouter.post("/:date", async (req, res) => {
  const { date, minutesRead, book} = req.body
  try {
    const bookId = await BookSerializer.getBookId(book)
    const newReadingSession = await ReadingSession.query().insertAndFetch({
      date: date,
      minutesRead: minutesRead,
      bookId: bookId,
      userId: req.user.id
    })
    newReadingSession.book = book
    return res.status(201).json({ newReadingSession });
  } catch (error) {

    return res.status(500).json({ errors: error });
  }
})

readingSessionsRouter.delete('/:date', async (req, res) => {
  console.log('in router')
  try {
    const readingSessionId = req.body.id
    console.log(req.body)
    console.log('readingSessionId', readingSessionId)
    await ReadingSession.query().deleteById(readingSessionId)
    return res.status(201).json({ message: 'Successful Delete' })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default readingSessionsRouter
