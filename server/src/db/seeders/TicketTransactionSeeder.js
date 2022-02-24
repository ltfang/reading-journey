import TicketTransaction from "../../models/TicketTransaction.js"
import User from "../../models/User.js"
import Profile from "../../models/Profile.js"

class TicketTransactionSeeder {
  static async seed() {
    const lilly = await User.query().findOne({ email: "lilly@lilly.com" })
    const noah = await Profile.query().findOne({ name: "Noah", userId: lilly.id })

    const transactionData = [
      {
        profileId: noah.id,
        number: 20,
        date: '2022-02-12',
        description: 'Play Super Smash Bros.'
      },
      {
        profileId: noah.id,
        number: 15,
        date: '2022-02-13',
        description: 'Watch Wild Kratts'
      },
      {
        profileId: noah.id,
        number: 15,
        date: '2022-02-19',
        description: 'Watch PJ Masks'
      },
      {
        profileId: noah.id,
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