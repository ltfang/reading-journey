import ProfileSerializer from "./ProfileSerializer.js"

class UserSerializer {
  static async getSummary(user) {
    const allowedAttributes = ["id", "email", "name"]
    let serializedUser = {}
    for (const attribute of allowedAttributes) {
      serializedUser[attribute] = user[attribute]
    }
    const profiles = await user.$relatedQuery("profiles")
    const serializedProfiles = profiles.map(profile => ProfileSerializer.getSummary(profile))
    serializedUser.profiles = serializedProfiles
    console.log('user in serializer', user)
    const currentProfile = serializedProfiles.find(profile => profile.id==user.currentProfileId)
    const currentProfileWithLabel = {...currentProfile, label: currentProfile.name}
    serializedUser.currentProfile = currentProfileWithLabel
    return serializedUser
  }
}

export default UserSerializer