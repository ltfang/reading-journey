import express from "express"
import ReadingSessionSerializer from "../../../../serializers/ReadingSessionSerializer.js"

const achievementsRouter = new express.Router()

achievementsRouter.get("/streaks", async (req, res) => {
  try {
    const streaks = await ReadingSessionSerializer.getStreaks(req.user.id)
    const currentStreak = ReadingSessionSerializer.getCurrentStreak(streaks)
    const longestStreak = ReadingSessionSerializer.getLongestStreak(streaks)
    const percentIn30 = ReadingSessionSerializer.percentInInterval(streaks, 30)
    const percentIn7 = ReadingSessionSerializer.percentInInterval(streaks, 7)
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json({ 
        longestStreak, 
        currentStreak, 
        percentIn30, 
        percentIn7 
      })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default achievementsRouter
