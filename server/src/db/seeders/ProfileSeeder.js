import Profile from "../../models/Profile.js"
import User from "../../models/User.js"

class ProfileSeeder {
  static async seed() {
    const lilly = await User.query().findOne({ email: "lilly@lilly.com" })

    const profileData = [
      {
        userId: lilly.id,
        name: "Noah",
      },
      {
        userId: lilly.id,
        name: "Isaiah",
      }
    ]

    for (const singleProfile of profileData) {
      const currentProfile = await Profile.query().findOne(singleProfile)
      if (!currentProfile) {
        await Profile.query().insert(singleProfile)
      }
    }
  }
}

export default ProfileSeeder