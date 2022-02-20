import React, { useState, useEffect } from 'react'
import Fetch from '../../services/Fetch'
import { DateTime } from 'luxon'

const Streaks = props => {
  const [streaks, setStreaks] = useState({
    currentStreak: {
      firstDate: {},
      lastDate: {},
      length: 0
    },
    longestStreak: {
      firstDate: {},
      lastDate: {},
      length: 0
    },
    percentIn30: 0,
    percentIn7: 0
  })

  const getStreaks = async () => {
    const body = await Fetch.get('/api/v1/achievements/streaks')
    setStreaks(body)
  }

  useEffect(() => {
    getStreaks()
  }, [])

  const formatDate = (date) => {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATE_SHORT)
  }
  
  const formatPercentage = (number) => {
    const percentage = Math.round(number*100)
    return `${percentage}%`
  }

  return (

    <div>
      <div className="streak-tile">
        <div className="streak-stat">{streaks.currentStreak.length}</div>
        <div className="streak-label">
          <div className="streak-name">Current Streak</div>
          <div className="streak-date">{formatDate(streaks.currentStreak.firstDate)}-{formatDate(streaks.currentStreak.lastDate)}</div>
        </div>
      </div>
      <div className="streak-tile">
        <div className="streak-stat">{streaks.longestStreak.length}</div>
        <div className="streak-label">
          <div className="streak-name">Longest Streak</div>
          <div className="streak-date">{formatDate(streaks.longestStreak.firstDate)}-{formatDate(streaks.longestStreak.lastDate)}</div>
        </div>
      </div>
      <div className="streak-tile">
        <div className="streak-stat">{formatPercentage(streaks.percentIn7)}</div>
        <div className="streak-label">
          <div className="streak-name">of Last 7 Days Read</div>
        </div>
      </div>
      <div className="streak-tile">
        <div className="streak-stat">{formatPercentage(streaks.percentIn30)}</div>
        <div className="streak-label">
          <div className="streak-name">of Last 30 Days Read</div>
        </div>
      </div>
    </div>
  )
}

export default Streaks