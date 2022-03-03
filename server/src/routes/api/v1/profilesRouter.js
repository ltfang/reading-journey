import express from "express"
import { Profile, User } from "../../../models/index.js"
import ProfileSerializer from "../../../../serializers/ProfileSerializer.js"
import UserSerializer from "../../../../serializers/UserSerializer.js"
import cleanUserInput from "../../../../services/cleanUserInput.js"
import { ValidationError } from "objection"

const profilesRouter = new express.Router()

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
  const { id, profileName } = req.body 
  try {
    const profile = await Profile.query().findById(id)
    const updatedProfile = await profile.$query().updateAndFetch({    
      name: profileName,
      id: profile.id,
      userId: profile.userId
    })
    return res.status(200).json({ updatedProfile });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

profilesRouter.delete("/", async (req, res) => {
  const profileId = req.body.id
  try {
    await Profile.query().deleteById(profileId)
    return res.status(200).json(true);
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

profilesRouter.get("/current", async (req, res) => {
  try {
    const user = await User.query().findById(req.user.id)
    let currentProfile = await Profile.query().findById(user.currentProfileId)
    //Set to first existing profile in case profile corresponding to id no longer exists  
    if (currentProfile === undefined) {
      const serializedUser = await UserSerializer.getSummary(user)
      currentProfile = serializedUser.profiles[0]
      await user.$query().patch({ currentProfileId: currentProfile.id})
    } 
    const serializedProfile = ProfileSerializer.getSummary(currentProfile)
    return res.status(200).json({ currentProfile: serializedProfile });
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

profilesRouter.patch("/current", async (req, res) => {
  const profileId = req.body.id
  try {
    const user = await User.query().findById(req.user.id)
    const updatedUser = await user.$query().patchAndFetch({ currentProfileId: profileId })
    return res.status(200).json({ updatedUser });
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

profilesRouter.patch("/default", async (req, res) => {
  const deletedProfileId = req.body.id
  try {
    const user = await User.query().findById(req.user.id)
    const serializedUser = await UserSerializer.getSummary(user)
    const currentProfile = serializedUser.profiles.find(profile => {
      return profile.id !== deletedProfileId
    })
    await user.$query().patch({ currentProfileId: currentProfile.id})
    return res.status(200).json({ currentProfile });
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})



export default profilesRouter
