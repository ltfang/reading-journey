import express from "express"
import { ReadingSession } from "../../../models/index.js"
import ReadingSessionSerializer from "../../../../serializers/ReadingSessionSerializer.js"
import BookSerializer from "../../../../serializers/BookSerializer.js"
import { DateTime } from "luxon"

const readingSessionsRouter = new express.Router();

readingSessionsRouter.get("/:date", async (req, res) => {
  try {
    const date = DateTime.fromFormat(req.params.date, 'yyyyMMdd')
    const userId = req.user.id
    const readingSessions = await ReadingSession.query()
    const serializedReadingSessions = await ReadingSessionSerializer.getReadingSessions(readingSessions, userId, date)
    const totalMinutes = ReadingSessionSerializer.getTotalMinutes(serializedReadingSessions)
    return res.status(200).json({ 
      readingSessions: serializedReadingSessions,
      totalMinutes: totalMinutes
     })
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
    // await TicketTransaction.query().insertAndFetch({
    //   userId: req.user.id,
    //   readingSessionId: newReadingSession.id,
    //   value: minutesRead,
    //   date: date, 
    //   description: "read book"       
    // })
    return res.status(201).json({ newReadingSession });
  } catch (error) {

    return res.status(500).json({ errors: error });
  }
})

readingSessionsRouter.delete('/:date', async (req, res) => {
  try {
    console.log('in router')
    const readingSessionId = req.body.id
    console.log(readingSessionId)
    // const readingSession = await ReadingSession.query().findById(readingSessionId)
    // const ticketTransaction = await readingSession.$relatedQuery("ticketTransaction")
    // await TicketTransaction.query().deleteById(ticketTransaction.id)
    await ReadingSession.query().deleteById(readingSessionId)
    return res.status(201).json(true)
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

readingSessionsRouter.patch('/:date', async (req, res) => {
  try {
    const readingSessionId = req.body.id
    const minutes = req.body.property
    // const readingSession = await ReadingSession.query().findById(readingSessionId)
    // const ticketTransaction = await readingSession.$relatedQuery("ticketTransaction")
    await ReadingSession.query().patchAndFetchById(readingSessionId, { minutesRead: minutes })
    // await TicketTransaction.query().patchAndFetchById(ticketTransaction.id, { value: minutes })
    return res.status(201).json(true)
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default readingSessionsRouter
