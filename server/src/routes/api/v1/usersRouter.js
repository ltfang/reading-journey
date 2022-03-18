import express from "express";
import { Profile, User } from "../../../models/index.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ username, email, password });
    const newProfile = await Profile.query().insertAndFetch({
      name: username,
      userId: persistedUser.id
    })
    await persistedUser.$query().patchAndFetch({ currentProfileId: newProfile.id })
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

export default usersRouter;
