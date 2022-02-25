import express from "express"
import { Profile } from "../../../models/index.js"
import ProfileSerializer from "../../../../serializers/ProfileSerializer.js"

const profilesRouter = new express.Router()

profilesRouter.get("/", async (req, res) => {
  try {
    const currentProfile = await Profile.query().findById(req.session.profileId)
    const serializedProfile = ProfileSerializer.getSummary(currentProfile)
    return res.status(201).json({ currentProfile:serializedProfile });
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

profilesRouter.post("/", async (req, res) => {
  try {
    const profileId = req.body.id
    req.session.profileId = profileId
    return res.status(201).json({ profileId });
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default profilesRouter
