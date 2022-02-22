import React, { useState, useEffect } from 'react'
import Medal from './Medal'
import Fetch from '../../../services/Fetch'

const MedalsPanel = props => {
  const [medals, setMedals] = useState({})
  
  const getMedals = async () => {
    const body = await Fetch.get('/api/v1/achievements/medals')
    setMedals(body)
  }

  useEffect(() => {
    getMedals()
  }, [])

  let medalsArray = []
  const addMedals = (key) => {
    for (let i=0; i<medals[key]; i++) {
      medalsArray.push(
        <Medal 
          key={`${key}_${i}`}
          level={key} 
        />
      )
    }  
  }

  for (const key of Object.keys(medals)) {
    addMedals(key)
  }

  return (
    <div>
      <h2 className="panel-header">My Medals</h2>
      <h3 className="panel-subheader">Complete streaks to earn medals!  Each streak earns you one medal of each qualifying type!</h3>
      <div className="medals-wrapper">
        {medalsArray}
      </div>
    </div>
  )
}

export default MedalsPanel