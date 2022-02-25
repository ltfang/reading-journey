import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";
import { Profile } from "../models/index.js"

const router = new express.Router();

const clientRoutes = ["/", "/user-sessions/new", "/users/new"];

const authedClientRoutes = ["/log", "/log/:date", "/tickets", "/bookshelf", "/achievements"]

router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

router.get(authedClientRoutes, async (req, res) => {
  if (req.user) {
      res.sendFile(getClientIndexPath());
  } else {
    res.redirect("/user-sessions/new")
  }
});
export default router;
