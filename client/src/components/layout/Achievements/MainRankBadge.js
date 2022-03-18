import React, { useState, useEffect, useContext } from 'react'
import Fetch from '../../../services/Fetch'
import { UserContext } from '../../UserContext'

const MainRankBadge = (props) => {
  const [rankData, setRankData] = useState({
    currentRank: "",
    nextRank: "",
    maxMinutes: 100,
    minMinutes: 1,
    currentMinutes: 0
  })
  const { currentProfile } = useContext(UserContext)

  const getRankData = async () => {
    const body = await Fetch.get('/api/v1/achievements/rank')
    setRankData(body.rankData)
  }

  useEffect(() => {
    getRankData()
  }, [currentProfile])

  const { currentRank, nextRank, maxMinutes, minMinutes, currentMinutes } = rankData
  let formattedRank = currentRank.toLowerCase()
  let badgeClass = `main-badge ${formattedRank}`
  let percentageComplete = Math.round((currentMinutes-minMinutes)/(maxMinutes+1-minMinutes)*100)
  
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
          <div className="initial">{currentRank[0]}</div>
        </div>
        <div className="ribbon">{currentRank}</div>
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