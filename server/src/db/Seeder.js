/* eslint-disable no-console */
import { connection } from "../boot.js"
import BookSeeder from "./seeders/BookSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"
import ReadingSessionSeeder from "./seeders/ReadingSessionSeeder.js"
import BadgeSeeder from "./seeders/BadgeSeeder.js"
import TicketTransactionSeeder from "./seeders/TicketTransactionSeeder.js"
import ProfileSeeder from "./seeders/ProfileSeeder.js"

class Seeder {
  static async seed() {

    console.log("Seeding books...")
    await BookSeeder.seed()

    console.log("Seeding users...")
    await UserSeeder.seed()

    console.log("Seeding profiles...")
    await ProfileSeeder.seed()

    console.log("Seeding reading sessions...")
    await ReadingSessionSeeder.seed()

    console.log("Seeding transactions...")
    await TicketTransactionSeeder.seed()

    console.log("Seeding badges...")
    await BadgeSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder