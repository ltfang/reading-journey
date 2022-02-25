import React from 'react'
import Fetch from '../../services/Fetch'

const ProfileIcon = ({ id, name }) => {

  const setProfile = async () => {
    await Fetch.post('/api/v1/profiles', { id })
  }

  const handleClick = () => {
    setProfile()
    //include redirect to new home screen
  }

  //Add ability to create a profile in parent component
  
  return (
    <div 
      className="profile-icon"
      onClick={handleClick}>
      {name}
    </div>
  )
}

export default ProfileIcon