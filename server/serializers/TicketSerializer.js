import Profile from "../src/models/Profile.js"

class TicketSerializer {
  static async getTotalTickets(profileId) {
    const profile = await Profile.query().findById(profileId)
    const minutes = await profile.$relatedQuery("readingSessions").sum("minutesRead")
    const earnedTickets = minutes[0].sum
    const tickets = await profile.$relatedQuery("ticketTransactions").sum("number") 
    const usedTickets = tickets[0].sum
    return earnedTickets - usedTickets
  }

  static async getRecentTransactions(profileId, number) {
    const profile = await Profile.query().findById(profileId)
    const transactions = await profile.$relatedQuery("ticketTransactions").orderBy('date', 'desc').limit(number)
    return transactions
  }
}

export default TicketSerializer