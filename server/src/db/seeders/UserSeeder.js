import User from "../../models/User.js"

class UserSeeder {
  static async seed() {
    const userData = [
      { name: "Noah",
        email: "noah@noah.com", 
        cryptedPassword: "123" 
      },
      { name: "Isaiah",
        email: "isaiah@isaiah.com", 
        cryptedPassword: "234" 
      }
    ]
    for (const singleUser of userData){
      const currentUser = await User.query().findOne(singleUser)
      if(!currentUser){
          await User.query().insert(singleUser)
      }
    }
  }
}
export default UserSeeder