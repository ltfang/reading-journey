import express from 'express'
import userSessionsRouter from './api/v1/userSessionsRouter.js'
import usersRouter from './api/v1/usersRouter.js'
import readingSessionsRouter from './api/v1/readingSessionsRouter.js'
import bookSearchRouter from './api/v1/bookSearchRouter.js'
import booksRouter from './api/v1/booksRouter.js'
import minutesRouter from './api/v1/minutesRouter.js'
import ticketsRouter from './api/v1/ticketsRouter.js'
import clientRouter from './clientRouter.js'

const rootRouter = new express.Router()
rootRouter.use('/', clientRouter)

rootRouter.use('/api/v1/user-sessions', userSessionsRouter)
rootRouter.use('/api/v1/users', usersRouter) 
rootRouter.use('/api/v1/log', readingSessionsRouter)
rootRouter.use('/api/v1/book-search', bookSearchRouter)
rootRouter.use('/api/v1/books', booksRouter)
rootRouter.use('/api/v1/minutes', minutesRouter)
rootRouter.use('/api/v1/tickets', ticketsRouter)

export default rootRouter;
