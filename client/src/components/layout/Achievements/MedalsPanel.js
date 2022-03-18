import React, { useState, useEffect, useContext } from 'react'
import Medal from './Medal'
import Fetch from '../../../services/Fetch'
import { UserContext } from '../../UserContext'

const MedalsPanel = (props) => {
  const [medals, setMedals] = useState({})
  const { currentProfile } = useContext(UserContext)
  
  const getMedals = async () => {
    const body = await Fetch.get('/api/v1/achievements/medals')
    setMedals(body)
  }

  useEffect(() => {
    getMedals()
  }, [currentProfile])

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
      <h2 className="panel-header">{currentProfile.name}'s Medals</h2>
      <h3 className="panel-subheader">Complete streaks to earn medals!  Each streak earns you one medal of each qualifying type!</h3>
      <div className="medals-wrapper">
        {medalsArray}
      </div>
    </div>
  )
}

export default MedalsPanel