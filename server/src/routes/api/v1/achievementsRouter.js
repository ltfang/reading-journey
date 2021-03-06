import express from "express"
import ReadingSessionSerializer from "../../../../serializers/ReadingSessionSerializer.js"
import Badge from "../../../models/Badge.js"
import BadgeSerializer from "../../../../serializers/BadgeSerializer.js"

const achievementsRouter = new express.Router()

achievementsRouter.get("/streaks", async (req, res) => {
  try {
    const streaks = await ReadingSessionSerializer.getStreaks(req.user.currentProfileId)
    if (streaks.length>0) {
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
    }
      return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json({
        currentStreak: {
          firstDate: "",
          lastDate: "",
          length: 0
        },
        longestStreak: {
          firstDate: "",
          lastDate: "",
          length: 0
        },
        percentIn30: 0,
        percentIn7: 0
      })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

achievementsRouter.get("/rank", async (req, res) => {
  try {
    const badges = await Badge.query()
    const serializedBadges = badges.map(badge => BadgeSerializer.getSummary(badge))
    const rankData = await ReadingSessionSerializer.getRankAndProgress(req.user.currentProfileId, serializedBadges)
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json({ 
        rankData: rankData,
        badges: serializedBadges
      })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

achievementsRouter.get("/medals", async (req, res) => {
  try {
    const streaks = await ReadingSessionSerializer.getStreaks(req.user.currentProfileId)
    const medals = ReadingSessionSerializer.getMedals(streaks)
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json(medals)
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})


export default achievementsRouter
