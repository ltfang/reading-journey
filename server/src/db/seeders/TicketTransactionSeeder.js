import TicketTransaction from "../../models/TicketTransaction.js"
import User from "../../models/User.js"

class TicketTransactionSeeder {
  static async seed() {
    const noah = await User.query().findOne({ email: "noah@email.com" })

    const transactionData = [
      {
        userId: noah.id,
        number: 20,
        date: '2022-02-12',
        description: 'Play Super Smash Bros.'
      },
      {
        userId: noah.id,
        number: 15,
        date: '2022-02-13',
        description: 'Watch Wild Kratts'
      },
      {
        userId: noah.id,
        number: 15,
        date: '2022-02-19',
        description: 'Watch PJ Masks'
      },
      {
        userId: noah.id,
        number: 10,
        date: '2022-02-19',
        description: 'Play Prodigy'
      }
    ]

    for (const singleTransaction of transactionData) {
      const currentTransaction = await TicketTransaction.query().findOne(singleTransaction)
      if (!currentTransaction) {
        await TicketTransaction.query().insert(singleTransaction)
      }
    }
  }
}

export default TicketTransactionSeeder