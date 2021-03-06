import BookSerializer from "./BookSerializer.js"
import Profile from "../src/models/Profile.js"
import { DateTime, Interval } from "luxon"
import _ from "lodash"

class ReadingSessionSerializer {
  static async getDetails(readingSession) {
    const allowedAttributes = ["id", "date", "minutesRead", "userId", "bookId"]
    let serializedReadingSession = {}
    for (const attribute of allowedAttributes) {
      serializedReadingSession[attribute] = readingSession[attribute]
    }
    const book = await readingSession.$relatedQuery("book")
    const serializedBook = BookSerializer.getSummary(book)
    serializedReadingSession.book = serializedBook
    return serializedReadingSession
  }

  static async getReadingSessions(readingSessions, profileId, date) {
    const filteredReadingSessions = readingSessions.filter(readingSession => {
      return readingSession.profileId == profileId && readingSession.date.toISOString().substring(0,10) === date.toFormat('yyyy-MM-dd')
    })
    const serializedReadingSessions = await Promise.all(filteredReadingSessions.map(async (readingSession) => {
      return await ReadingSessionSerializer.getDetails(readingSession)
    }))
    return serializedReadingSessions
  }

  static async getLastDateRead(bookId, profileId) {
    const profile = await Profile.query().findById(profileId)
    const readingSessions = await profile.$relatedQuery("readingSessions").where('bookId', bookId).orderBy('date', 'desc')
    const lastReadingSessionDate = readingSessions[0].date
    return lastReadingSessionDate
  }

  static getTotalMinutes(readingSessions) {
    return readingSessions.reduce((prev, current) => {
      return prev+current.minutesRead 
    }, 0)
  }

  static getDailyMinutesArray(readingSessions, interval, includeZeros) {
    let dailyMinutesArray = []
    interval.splitBy({days:1}).forEach(d => {
      const dailyReadingSessions = readingSessions.filter(readingSession => {
        return readingSession.date.toISOString().substring(0,10) === d.start.toFormat('yyyy-MM-dd')
      })
      const formattedDate = d.start.toFormat('yyyyMMdd')
      const totalMinutes = ReadingSessionSerializer.getTotalMinutes(dailyReadingSessions)
      if (includeZeros || totalMinutes > 0) {
        dailyMinutesArray.push({
          date: formattedDate,
          totalMinutes: totalMinutes
        })
      }
    })
    return dailyMinutesArray
  }

  static async getDailyMinutes(startDate, endDate, profileId) {
    const profile = await Profile.query().findById(profileId)
    const interval = Interval.fromDateTimes(startDate, endDate)
    const readingSessions = await profile.$relatedQuery("readingSessions")
    const dailyMinutesArray = ReadingSessionSerializer.getDailyMinutesArray(readingSessions, interval, true)
    return dailyMinutesArray
  }

  static async getAllDailyMinutes(profileId) { 
    const profile = await Profile.query().findById(profileId)
    const readingSessions = await profile.$relatedQuery("readingSessions").orderBy("date")
    if (readingSessions.length > 0) {
      const startDate = DateTime.fromJSDate(readingSessions[0].date)
      const lastDate = DateTime.fromJSDate(readingSessions[readingSessions.length-1].date)
      const endDate = lastDate.plus({days:1})
      const interval = Interval.fromDateTimes(startDate, endDate)
      const dailyMinutesArray = ReadingSessionSerializer.getDailyMinutesArray(readingSessions, interval, false)
      return dailyMinutesArray
    }
    return []
  }

  static async getStreaks(profileId) {
    let dailyMinutesArray = await ReadingSessionSerializer.getAllDailyMinutes(profileId)
    dailyMinutesArray = dailyMinutesArray.map(record => {
      record.date = DateTime.fromFormat(record.date, 'yyyyMMdd')
      return record
    })
    let streaks = []
    dailyMinutesArray.forEach((record, index) => {
      if (index===0 || !record.date.minus({days:1}).equals(dailyMinutesArray[index-1].date)) {
        streaks.push({
          firstDate: record.date
        })
      } 
      if (index==dailyMinutesArray.length-1 || !record.date.plus({days:1}).equals(dailyMinutesArray[index+1].date)) { 
        const latestStreak = streaks[streaks.length-1]
        latestStreak.lastDate=record.date
        const length = latestStreak.lastDate.diff(latestStreak.firstDate, 'days')
        latestStreak.streakLength = length.days+1
      }
    })
    return streaks
  }

  static getCurrentStreak(streaks) {
    const currentStreak = streaks.find(streak => {
      return streak.lastDate.equals(DateTime.now().startOf('day'))
    })
    if (currentStreak) {
      return currentStreak
    }
    return {
      firstDate: "",
      lastDate: "",
      streakLength: 0
    }
  }

  static getLongestStreak(streaks) {
    const longestStreak = streaks.reduce((prev, current) => {
      if (current.length >= prev.length) {
        return current
      } 
      return prev
    })
    return longestStreak
  }

  static percentInInterval(streaks, intervalDays) {
    let firstDayInInterval = DateTime.now().minus({days: intervalDays-1}).startOf('day')
    let streaksInInterval = streaks.filter(streak => {
      return streak.lastDate >= firstDayInInterval
    })
    let totalLength =  _.sumBy(streaksInInterval, 'streakLength')
    const firstStreak = streaksInInterval[0]
    if (firstStreak?.firstDate < firstDayInInterval) {
      let daysInFirstStreak = firstStreak.lastDate.diff(firstDayInInterval, 'days').days+1
      totalLength = totalLength - firstStreak.streakLength + daysInFirstStreak
    }
    debugger
    return totalLength/intervalDays
  }

  static async getTotalMinutesByProfile(profileId) {
    const profile = await Profile.query().findById(profileId)
    const totalMinutes = await profile.$relatedQuery('readingSessions').sum('minutesRead')
    return totalMinutes[0].sum
  }

  static async getRankAndProgress(profileId, badges) {
    const totalMinutes = await ReadingSessionSerializer.getTotalMinutesByProfile(profileId)
    let currentRank = badges[0]
    for (const badge of badges) {
      if (totalMinutes >= badge.minutesMin && totalMinutes <= badge.minutesMax) {
        currentRank = badge
      }
    }
    const nextRank = badges[badges.indexOf(currentRank)+1]
    return { 
      currentRank: currentRank.rank, 
      nextRank: nextRank.rank,
      currentMinutes: parseInt(totalMinutes),
      maxMinutes: currentRank.minutesMax,
      minMinutes: currentRank.minutesMin
    }
  }

  static getMedals(streaks) {
    const medals = {
      three: 0,
      five: 0,
      seven: 0
    }
    streaks.forEach(streak => {
      if (streak.streakLength>=3) {
        medals.three++
      }
      if (streak.streakLength>=5) {
        medals.five++
      }
      if (streak.streakLength>=7) {
        medals.seven++
      }
    })
    return medals
  }
}

export default ReadingSessionSerializer