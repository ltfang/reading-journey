import React from 'react'
import StreaksPanel from './StreaksPanel'
import RankPanel from './RankPanel'
import MedalsPanel from './MedalsPanel'


const AchievementsPage = ({ profile }) => {
  return (
    <div>
      <h1 className="page-header">{profile.name}'s Achievements</h1>
      <div className="grid-x grid-margin-x achievements-wrapper">
        <div className="cell small-4 achievement-box">
          <StreaksPanel profile={profile}/>
        </div>
        <div className="cell small-4 achievement-box">
          <div className="grid-y rank-wrapper">
            <RankPanel profile={profile}/>
          </div>
        </div>
        <div className="cell small-4 achievement-box">
          <MedalsPanel profile={profile}/>
        </div>
      </div>
    </div>
  )
}

export default AchievementsPage