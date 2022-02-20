import React, { useState, useEffect } from 'react'

const Streaks = props => {
  return (
    <div>
      <div className="streak-tile">
        <div className="streak-stat">3</div>
        <div className="streak-label">
          <div className="streak-name">Current Streak</div>
          <div className="streak-date">2/16/2022-2/19/2022</div>
        </div>
      </div>
      <div className="streak-tile">
        <div className="streak-stat">7</div>
        <div className="streak-label">
          <div className="streak-name">Longest Streak</div>
          <div className="streak-date">2/16/2022-2/19/2022</div>
        </div>
      </div>
      <div className="streak-tile">
        <div className="streak-stat">20%</div>
        <div className="streak-label">
          <div className="streak-name">Days This Week</div>
          <div className="streak-date">2/16/2022-2/19/2022</div>
        </div>
      </div>
      <div className="streak-tile">
        <div className="streak-stat">50%</div>
        <div className="streak-label">
          <div className="streak-name">Days This Month</div>
          <div className="streak-date">2/16/2022-2/19/2022</div>
        </div>
      </div>
    </div>
  )
}

export default Streaks