import express from "express"
import TicketSerializer from "../../../../serializers/TicketSerializer.js"

const ticketsRouter = new express.Router()

ticketsRouter.get("/", async (req, res) => {
  try {
    const totalTickets = await TicketSerializer.getTotalTickets(req.user.id)
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json({ totalTickets })
  } catch (error) {
    return res.status(401).json({ errors: error })
  }
})

export default ticketsRouter
