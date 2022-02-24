import express from "express"

const profilesRouter = new express.Router()

profilesRouter.post("/", async (req, res) => {
  try {
    console.log('req.body', req.body)
    const profileId = req.body.id
    req.session.profileId = profileId
    return res.status(201).json({ profileId });
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default profilesRouter
