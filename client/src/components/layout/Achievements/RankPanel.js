import React, { useState, useEffect } from 'react'
import SmallRankBadge from './SmallRankBadge'
import MainRankBadge from './MainRankBadge'
import Fetch from '../../../services/Fetch'

const RankPanel = ({ profile }) => {
  const [badges, setBadges] = useState([])

  const getBadges = async () => {
    const body = await Fetch.get('/api/v1/achievements/rank')
    setBadges(body.badges)
  }

  useEffect(()=> {
    getBadges()
  }, [profile])

  const badgeList = badges.map(badge => {
    return (
      <SmallRankBadge 
        key={badge.id}
        rank={badge.rank}
      />
    )
  })

  return(
    <>
      <h2 className="panel-header">{profile.name}'s Rank</h2>
      <h3 className="panel-subheader">Earn your next rank based on your total reading time!</h3>
      <div className="cell small-8 main-badge-wrapper">
        <MainRankBadge profile={profile} />
      </div>
      <div className="cell small-4 badge-list-wrapper">
        {badgeList}
      </div>
    </>
  )
}

export default RankPanel