class ProfileSerializer {
  static getSummary(profile) {
    const allowedAttributes = ["id", "userId", "name"]
    let serializedProfile = {}
    for (const attribute of allowedAttributes) {
      serializedProfile[attribute] = profile[attribute]
    }
    return serializedProfile
  }
}

export default ProfileSerializer