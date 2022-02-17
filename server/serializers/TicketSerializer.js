import TicketTransaction from "../src/models/TicketTransaction.js"
import User from "../src/models/User.js"

class TicketSerializer {
  static async getTotalTickets(userId) {
    const user = await User.query().findById(userId)
    const ticketTransactions = await user.$relatedQuery("ticketTransactions")
    const totalTickets = ticketTransactions.reduce((prev, current) => {
      return prev + current.value
    }, 0)
    return totalTickets
  }
}

export default TicketSerializer