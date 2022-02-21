import React from 'react'
import Streaks from './Streaks'
import Rank from './Rank'


const AchievementsPage = props => {
  return (
    <div>
      <h1>My Achievements</h1>
      <div className="grid-x grid-margin-x achievements-wrapper">
        <div className="cell small-4 achievement-box">
          <Streaks />
        </div>
        <div className="cell small-4 achievement-box">
          <div className="grid-y rank-wrapper">
            <Rank />
          </div>
        </div>
        <div className="cell small-4 achievement-box">
          Box3
        </div>
      </div>
    </div>
  )
}

export default AchievementsPage