class BadgeSerializer {
  static getSummary(badge) {
    const allowedAttributes = ["id", "rank", "minutesMin", "minutesMax"]
    let serializedBadge = {}
    for (const attribute of allowedAttributes) {
      serializedBadge[attribute] = badge[attribute]
    }
    return serializedBadge
  }
}

export default BadgeSerializer