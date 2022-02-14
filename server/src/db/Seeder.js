/* eslint-disable no-console */
import { connection } from "../boot.js"
import BookSeeder from "./seeders/BookSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"
import ReadingSessionSeeder from "./seeders/ReadingSessionSeeder.js"

class Seeder {
  static async seed() {

    console.log("Seeding books...")
    await BookSeeder.seed()

    console.log("Seeding users...")
    await UserSeeder.seed()

    console.log("Seeding reading sessions...")
    await ReadingSessionSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder