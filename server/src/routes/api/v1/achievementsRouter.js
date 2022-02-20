import express from "express"
import ReadingSessionSerializer from "../../../../serializers/ReadingSessionSerializer.js"

const achievementsRouter = new express.Router()

achievementsRouter.get("/", async (req, res) => {
  try {
    const streaks = await ReadingSessionSerializer.getStreaks(req.user.id)
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json({ streaks })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default achievementsRouter
