import React from 'react'

const SmallRankBadge = ({ rank }) => {
  let formattedRank = rank.toLowerCase()
  let badgeClass = `badge ${formattedRank}`
  return (
    <div className="small-badge-wrapper">
      <div className={badgeClass}>
        <div className="circle">
          <div className="initial">{rank[0]}</div>
        </div>
        <div className="ribbon">{rank}</div>
      </div>
    </div>
  )
}

export default SmallRankBadge