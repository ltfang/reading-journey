import User from "../src/models/User.js"

class TicketSerializer {
  static async getTotalTickets(userId) {
    const user = await User.query().findById(userId)
    const minutes = await user.$relatedQuery("readingSessions").sum("minutesRead")
    const earnedTickets = minutes[0].sum
    const tickets = await user.$relatedQuery("ticketTransactions").sum("number") 
    const usedTickets = tickets[0].sum
    return earnedTickets - usedTickets
  }

  static async getRecentTransactions(userId, number) {
    const user = await User.query().findById(userId)
    const transactions = await user.$relatedQuery("ticketTransactions").orderBy('date', 'desc').limit(number)
    return transactions
  }
}

export default TicketSerializer