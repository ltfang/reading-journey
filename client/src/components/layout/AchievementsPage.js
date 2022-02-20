import React from 'react'
import Streaks from './Streaks'

const AchievementsPage = props => {
  return (
    <div>
      <h1>My Achievements</h1>
      <div className="grid-x grid-margin-x">
        <div className="cell small-4 achievement-box">
          <Streaks />
        </div>
        <div className="cell small-4 achievement-box">
          Box2
        </div>
        <div className="cell small-4 achievement-box">
          Box3
        </div>
      </div>
    </div>
  )
}

export default AchievementsPage