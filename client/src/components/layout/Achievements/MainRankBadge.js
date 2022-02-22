import React, { useState, useEffect } from 'react'
import Fetch from '../../../services/Fetch'

const MainRankBadge = props => {
  const [rank, setRank] = useState("")
  const [currentMinutes, setCurrentMinutes] = useState(0)
  const [maxMinutes, setMaxMinutes] = useState(100)
  const [nextRank, setNextRank] = useState("")


  const getRank = async () => {
    const body = await Fetch.get('/api/v1/achievements/rank')
    setRank(body.rank.currentRank)
    setCurrentMinutes(body.rank.currentMinutes)
    setMaxMinutes(body.rank.maxMinutes)
    setNextRank(body.rank.nextRank)
  }

  useEffect(() => {
    getRank()
  }, [])

  let formattedRank = rank.toLowerCase()
  let badgeClass = `main-badge ${formattedRank}`
  let percentageComplete = Math.round(currentMinutes/(maxMinutes+1)*100)
  
  const fillerStyles = {
    height: '100%',
    width: `${percentageComplete}%`,
    backgroundColor: '#8023AD',
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 1s ease-in-out'
  }

  return (
    <div className="main-badge-progress-wrapper">
      <div className={badgeClass}>
        <div className="circle">
          <div className="initial">{rank[0]}</div>
        </div>
        <div className="ribbon">{rank}</div>
      </div>
      <div className="progress-bar-container">
        <div style={fillerStyles}>
          <span className="progress-bar-percentage">{`${percentageComplete}%`}</span>
        </div>
      </div>
      <div className="progress-bar-label">
        {`${maxMinutes+1-currentMinutes} mins to the ${nextRank} rank`}
      </div>
    </div>
  )
}

export default MainRankBadge