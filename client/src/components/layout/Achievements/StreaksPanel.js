import React, { useState, useEffect, useContext } from 'react'
import Fetch from '../../../services/Fetch'
import { DateTime } from 'luxon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../UserContext'

const StreaksPanel = (props) => {
  const [streaks, setStreaks] = useState({
    currentStreak: {
      firstDate: "",
      lastDate: "",
      streakLength: 0
    },
    longestStreak: {
      firstDate: "",
      lastDate: "",
      streakLength: 0
    },
    percentIn30: 0,
    percentIn7: 0
  })

  const { currentProfile } = useContext(UserContext)

  const getStreaks = async () => {
    const body = await Fetch.get('/api/v1/achievements/streaks')
    setStreaks(body)
  }

  useEffect(() => {
    getStreaks()
  }, [currentProfile])

  const formatDateRange = (date1, date2) => {
    if (date1!=="") {
      return `${DateTime.fromISO(date1).toLocaleString(DateTime.DATE_SHORT)} - ${DateTime.fromISO(date2).toLocaleString(DateTime.DATE_SHORT)}` 
    }
    return ""
  }
  
  const formatPercentage = (number) => {
    const percentage = Math.round(number*100)
    return `${percentage}%`
  }

  return (

    <div>
      <h2 className="panel-header">{currentProfile.name}'s Stats</h2>
      <h3 className="panel-subheader">How many days in a row can you read? Keep reading for a new record!</h3>
      <div className="streak-tile">
        <div className="streak-icon-name">
          <FontAwesomeIcon 
            icon={faFire}
            className="streak-icon fa-3x"
          />
          <div className="streak-stat">{streaks.currentStreak.streakLength}</div>
        </div>
        <div className="streak-label">
          <div className="streak-name">Current Streak</div>
          <div className="streak-date">{formatDateRange(streaks.currentStreak.firstDate,streaks.currentStreak.lastDate)}</div>
        </div>
      </div>
      <div className="streak-tile">
        <div className="streak-icon-name">
          <FontAwesomeIcon 
          icon={faFire}
          className="streak-icon fa-3x"
          />
          <div className="streak-stat">{streaks.longestStreak.streakLength}</div>
        </div>
        <div className="streak-label">
          <div className="streak-name">Longest Streak</div>
          <div className="streak-date">{formatDateRange(streaks.longestStreak.firstDate,streaks.longestStreak.lastDate)}</div>
        </div>
      </div>
      <div className="streak-tile">
        <div className="streak-stat">{formatPercentage(streaks.percentIn7)}</div>
        <div className="streak-label">
          <div className="streak-name">of Last 7 Days</div>
        </div>
      </div>
      <div className="streak-tile">
        <div className="streak-stat">{formatPercentage(streaks.percentIn30)}</div>
        <div className="streak-label">
          <div className="streak-name">of Last 30 Days</div>
        </div>
      </div>
    </div>
  )
}

export default StreaksPanel