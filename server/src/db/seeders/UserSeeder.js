import User from "../../models/User.js"
import Bcrypt from "bcrypt"

class UserSeeder {
  static async seed() {
    const password = "password"
    const cryptedPassword = Bcrypt.hashSync(password, 10)

    const userData = [
      { name: "Lilly",
        email: "lilly@lilly.com", 
        cryptedPassword: cryptedPassword 
      },
      { name: "Noah",
        email: "noah@email.com", 
        cryptedPassword: cryptedPassword 
      }
    ]
    for (const singleUser of userData){
      const currentUser = await User.query().findOne({ email: singleUser.email })
      if(!currentUser){
          await User.query().insert(singleUser)
      }
    }
  }
}
export default UserSeeder