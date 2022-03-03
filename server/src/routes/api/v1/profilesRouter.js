import express from "express"
import { Profile, User } from "../../../models/index.js"
import ProfileSerializer from "../../../../serializers/ProfileSerializer.js"
import cleanUserInput from "../../../../services/cleanUserInput.js"
import { ValidationError } from "objection"

const profilesRouter = new express.Router()

profilesRouter.get("/", async (req, res) => {
  try {
    const user = await User.query().findById(req.user.id)
    const currentProfile = await Profile.query().findById(user.currentProfileId)
    const serializedProfile = ProfileSerializer.getSummary(currentProfile)
    return res.status(200).json({ currentProfile: serializedProfile });
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

profilesRouter.post("/", async (req, res) => {
  console.log('req.body', req.body)
  const name = cleanUserInput(req.body.profileName)
  try {
    const user = await User.query().findById(req.user.id)
    const newProfile = await Profile.query().insertAndFetch({ 
      name: name,
      userId: user.id 
    })
    const serializedNewProfile = ProfileSerializer.getSummary(newProfile)
    console.log('serializedNewProfile', serializedNewProfile)
    await user.$query().patchAndFetch({ currentProfileId: newProfile.id })
    return res.status(201).json({ newProfile: serializedNewProfile })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
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
