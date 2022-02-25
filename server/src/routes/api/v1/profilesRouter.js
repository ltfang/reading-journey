import express from "express"
import { Profile, User } from "../../../models/index.js"
import ProfileSerializer from "../../../../serializers/ProfileSerializer.js"

const profilesRouter = new express.Router()

profilesRouter.get("/", async (req, res) => {
  try {
    const user = await User.query().findById(req.user.id)
    const currentProfile = await Profile.query().findById(user.profileId)
    const serializedProfile = ProfileSerializer.getSummary(currentProfile)
    return res.status(201).json({ currentProfile:serializedProfile });
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

profilesRouter.patch("/", async (req, res) => {
  const profileId = req.body.id
  try {
    const user = await User.query().findById(req.user.id)
    const updatedUser = await user.$query().patchAndFetch({ currentProfileId: profileId })
    return res.status(201).json({ updatedUser });
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default profilesRouter
