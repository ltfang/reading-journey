import express from "express"
import TicketSerializer from "../../../../serializers/TicketSerializer.js"
import TicketTransaction from "../../../models/TicketTransaction.js"

const ticketsRouter = new express.Router()

ticketsRouter.get("/total", async (req, res) => {
  try {
    const totalTickets = await TicketSerializer.getTotalTickets(req.user.id)
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
    const recentTransactions = await TicketSerializer.getRecentTransactions(req.user.id, 5)
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
  const userId = req.user.id
  try {
    const totalTickets = await TicketSerializer.getTotalTickets(userId)
    const newTotal = totalTickets-number
    if (newTotal < 0) {
      return res.status(201).json({error: 'Not enough tickets!'})
    }
    await TicketTransaction.query().insertAndFetch({ date, number, description, userId })
    
    return res.status(201).json({ totalTickets: newTotal })
  } catch (error) {

    return res.status(500).json({ errors: error })
  }
})

export default ticketsRouter
