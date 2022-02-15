import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import readingSessionsRouter from "./api/v1/readingSessionsRouter.js";
import booksRouter from "./api/v1/booksRouter.js";
import clientRouter from "./clientRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter); 
rootRouter.use("/api/v1/log", readingSessionsRouter);
rootRouter.use("/api/v1/books", booksRouter);

export default rootRouter;
