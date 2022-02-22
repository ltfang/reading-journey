import React from 'react'
import StreaksPanel from './StreaksPanel'
import RankPanel from './RankPanel'
import MedalsPanel from './MedalsPanel'


const AchievementsPage = props => {
  return (
    <div>
      <h1 className="page-header">My Achievements</h1>
      <div className="grid-x grid-margin-x achievements-wrapper">
        <div className="cell small-4 achievement-box">
          <StreaksPanel />
        </div>
        <div className="cell small-4 achievement-box">
          <div className="grid-y rank-wrapper">
            <RankPanel />
          </div>
        </div>
        <div className="cell small-4 achievement-box">
          <MedalsPanel />
        </div>
      </div>
    </div>
  )
}

export default AchievementsPage