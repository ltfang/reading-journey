import BookSerializer from "./BookSerializer.js"
import { DateTime, Interval } from "luxon"
import User from "../src/models/User.js"
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

  static async getReadingSessions(readingSessions, userId, date) {
    const filteredReadingSessions = readingSessions.filter(readingSession => {
      return readingSession.userId === userId && readingSession.date.toISOString().substring(0,10) === date.toFormat('yyyy-MM-dd')
    })
    const serializedReadingSessions = await Promise.all(filteredReadingSessions.map(async (readingSession) => {
      return await ReadingSessionSerializer.getDetails(readingSession)
    }))
    return serializedReadingSessions
  }

  static async getLastDateRead(bookId, userId) {
    const user = await User.query().findById(userId)
    const readingSessions = await user.$relatedQuery("readingSessions").where('bookId', bookId).orderBy('date', 'desc')
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
        return readingSession.date.getTime() === d.start.toJSDate().getTime()
      })
      const totalMinutes = ReadingSessionSerializer.getTotalMinutes(dailyReadingSessions)
      if (includeZeros || totalMinutes > 0) {
        dailyMinutesArray.push({
          date: d.start,
          totalMinutes: totalMinutes
        })
      }
    })
    return dailyMinutesArray
  }

  static async getDailyMinutes(startDate, endDate, userId) {
    const user = await User.query().findById(userId)
    const interval = Interval.fromDateTimes(startDate, endDate)
    const readingSessions = await user.$relatedQuery("readingSessions")
    const dailyMinutesArray = ReadingSessionSerializer.getDailyMinutesArray(readingSessions, interval, true)
    return dailyMinutesArray
  }

  static async getAllDailyMinutes(userId) { 
    const user = await User.query().findById(userId)
    const readingSessions = await user.$relatedQuery("readingSessions").orderBy("date")
    const startDate = DateTime.fromJSDate(readingSessions[0].date)
    const lastDate = DateTime.fromJSDate(readingSessions[readingSessions.length-1].date)
    const endDate = lastDate.plus({days:1})
    const interval = Interval.fromDateTimes(startDate, endDate)
    const dailyMinutesArray = ReadingSessionSerializer.getDailyMinutesArray(readingSessions, interval, false)
    return dailyMinutesArray
  }

  static async getStreaks(userId) {
    const dailyMinutesArray = await ReadingSessionSerializer.getAllDailyMinutes(userId)
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
        latestStreak.length = length.days+1
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
      length: 0
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
    let totalLength =  _.sumBy(streaksInInterval, 'length')
    const firstStreak = streaksInInterval[0]
    if (firstStreak.firstDate < firstDayInInterval) {
      let daysInFirstStreak = firstStreak.lastDate.diff(firstDayInInterval, 'days').days+1
      totalLength = totalLength - firstStreak.length + daysInFirstStreak
    }
    return totalLength/intervalDays
  }

  static async getTotalMinutesByUser(userId) {
    const user = await User.query().findById(userId)
    const totalMinutes = await user.$relatedQuery('readingSessions').sum('minutesRead')
    return totalMinutes[0].sum
  }

  static async getRankAndProgress(userId, badges) {
    const totalMinutes = await ReadingSessionSerializer.getTotalMinutesByUser(userId)
    let currentRank = badges[0]
    for (const badge of badges) {
      if (totalMinutes >= badge.minutesMin && totalMinutes <= badge.minutesMax) {
        currentRank = badge
      }
    }
    return { 
      currentRank: currentRank.rank, 
      currentMinutes: parseInt(totalMinutes),
      maxMinutes: currentRank.minutesMax
    }
  }

  static getMedals(streaks) {
    const medals = {
      three: 0,
      five: 0,
      seven: 0
    }
    streaks.forEach(streak => {
      if (streak.length>=3) {
        medals.three++
      }
      if (streak.length>=5) {
        medals.five++
      }
      if (streak.length>=7) {
        medals.seven++
      }
    })
    return medals
  }
}

export default ReadingSessionSerializer