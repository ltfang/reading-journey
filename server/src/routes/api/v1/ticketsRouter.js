import express from "express"
import TicketSerializer from "../../../../serializers/TicketSerializer.js"
import TicketTransaction from "../../../models/TicketTransaction.js"

const ticketsRouter = new express.Router()

ticketsRouter.get("/total", async (req, res) => {
  try {
    const totalTickets = await TicketSerializer.getTotalTickets(req.user.currentProfileId)
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json({ totalTickets })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

ticketsRouter.get("/recent", async (req, res) => {
  try {
    const recentTransactions = await TicketSerializer.getRecentTransactions(req.user.currentProfileId, 4)
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json({ recentTransactions })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

ticketsRouter.post("/", async (req, res) => {
  const { date, number, description } = req.body
  const profileId = req.user.currentProfileId
  try {
    const totalTickets = await TicketSerializer.getTotalTickets(profileId)
    const newTotal = totalTickets-number
    if (newTotal < 0) {
      return res.status(201).json({error: 'Not enough tickets!'})
    }
    await TicketTransaction.query().insertAndFetch({ date, number, description, profileId })
    return res.status(201).json({ totalTickets: newTotal })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

ticketsRouter.patch("/", async (req, res) => {
  const { id, date, number, description } = req.body
  try {
    const transactionToBeUpdated = await TicketTransaction.query().findById(id)
    const totalTickets = await TicketSerializer.getTotalTickets(req.user.currentProfileId)
    const newTotal = totalTickets+transactionToBeUpdated.number-number
    if (newTotal < 0) {
      return res.status(200).json({error: 'Not enough tickets!'})
    }
    await TicketTransaction.query().patchAndFetchById(id, { date, number, description })    
    return res.status(200).json({ totalTickets: newTotal })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

ticketsRouter.delete('/', async (req, res) => {
  try {
    const ticketTransactionId = req.body.id
    await TicketTransaction.query().deleteById(ticketTransactionId)
    const totalTickets = await TicketSerializer.getTotalTickets(req.user.currentProfileId) 
    return res.status(200).json({ totalTickets })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})


export default ticketsRouter
