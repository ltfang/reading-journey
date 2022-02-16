import express from "express"
import BookSerializer from "../../../../serializers/BookSerializer.js"
import ReadingSessionSerializer from "../../../../serializers/ReadingSessionSerializer.js"
import { User } from "../../../models/index.js"

import { DateTime } from "luxon"

const minutesRouter = new express.Router()

minutesRouter.get("/", async (req, res) => {
  const start = req.query.start
  const end = req.query.end
  const startDate = DateTime.fromFormat(start, 'yyyyMMdd')
  //Need to add one day because format conversion loses time granularity, which affects behavior
  const endDate = DateTime.fromFormat(end, 'yyyyMMdd').plus({days:1})
  try {
    const dailyMinutesArray = await ReadingSessionSerializer.getDailyMinutes(startDate, endDate, req.user.id)
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json(dailyMinutesArray)
  } catch (error) {
    return res.status(401).json({ errors: error })
  }
})

export default minutesRouter
