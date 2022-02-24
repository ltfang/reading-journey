import express from "express"
import ReadingSessionSerializer from "../../../../serializers/ReadingSessionSerializer.js"

import { DateTime } from "luxon"

const minutesRouter = new express.Router()

minutesRouter.get("/", async (req, res) => {
  console.log('cookie name', req.session.name)
  const startDate = DateTime.fromFormat(req.query.start, 'yyyyMMdd')
  const endDate = DateTime.fromFormat(req.query.end, 'yyyyMMdd')
  try {
    const dailyMinutesArray = await ReadingSessionSerializer.getDailyMinutes(startDate, endDate, req.user.id)
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json(dailyMinutesArray)
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default minutesRouter
