import React from 'react'
import StreaksPanel from './StreaksPanel'
import RankPanel from './RankPanel'
import MedalsPanel from './MedalsPanel'


const AchievementsPage = ({ currentProfile }) => {
  return (
    <div>
      <h1 className="page-header">{currentProfile.name}'s Achievements</h1>
      <div className="grid-x grid-margin-x achievements-wrapper">
        <div className="cell small-4 achievement-box">
          <StreaksPanel currentProfile={currentProfile}/>
        </div>
        <div className="cell small-4 achievement-box">
          <div className="grid-y rank-wrapper">
            <RankPanel currentProfile={currentProfile}/>
          </div>
        </div>
        <div className="cell small-4 achievement-box">
          <MedalsPanel currentProfile={currentProfile}/>
        </div>
      </div>
    </div>
  )
}

export default AchievementsPage