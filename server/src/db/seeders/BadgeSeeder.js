import Badge from "../../models/Badge.js"

class BadgeSeeder {
  static async seed() {
    const badgeData = [
      {
        rank: "Wanderer",
        minutesMin: 0,
        minutesMax: 14
      },
      {
        rank: "Excursionist",
        minutesMin: 15,
        minutesMax: 29
      },
      {
        rank: "Sightseer",
        minutesMin: 30,
        minutesMax: 53
      },
      {
        rank: "Rover",
        minutesMin: 54,
        minutesMax: 100
      },
      {
        rank: "Pathfinder",
        minutesMin: 101,
        minutesMax: 185
      },
      {
        rank: "Orienteer",
        minutesMin: 186,
        minutesMax: 343
      },
      {
        rank: "Adventurer",
        minutesMin: 344,
        minutesMax: 635
     },
      {
        rank: "Voyager",
        minutesMin: 636,
        minutesMax: 1174      
      },
      {
        rank: "Discoverer",
        minutesMin: 1175,
        minutesMax: 2172     
      },
      {
        rank: "Explorer",
        minutesMin: 2173,
        minutesMax: 4017      
      },
      {
        rank: "Trailblazer",
        minutesMin: 4018,
        minutesMax: 7428     
       },
      {
        rank: "Wayfarer",
        minutesMin: 7429,
        minutesMax: 13736
      },
      {
        rank: "Navigator",
        minutesMin: 13737,
        minutesMax: 25398
      },
      {
        rank: "Globetrotter",
        minutesMin: 25398,
        minutesMax: 46962
      },
      {
        rank: "Argonaut",
        minutesMin: 46963,
        minutesMax: 86834
      }
    ]
    
    for (const singleBadge of badgeData) {
      const currentBadge = await Badge.query().findOne(singleBadge)
      if (!currentBadge) {
        await Badge.query().insert(singleBadge)
      }
    }
  }
}

export default BadgeSeeder