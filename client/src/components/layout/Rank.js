import React, { useState, useEffect } from 'react'
import SmallRankBadge from './SmallRankBadge'
import MainRankBadge from './MainRankBadge'
import Fetch from '../../services/Fetch'

const Rank = props => {
  const [badges, setBadges] = useState([])
  const [mainBadge, setMainBadge] = useState({})

  const getBadges = async () => {
    const body = await Fetch.get('/api/v1/achievements/rank')
    setBadges(body.badges)
  }

  useEffect(()=> {
    getBadges()
  }, [])

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
      <div className="cell small-8 main-badge-wrapper">
        <MainRankBadge />
      </div>
      <div className="keep-reading">Keep reading to earn your next rank!</div>
      <div className="cell small-4 badge-list-wrapper">
        {badgeList}
      </div>
    </>
  )
}

export default Rank