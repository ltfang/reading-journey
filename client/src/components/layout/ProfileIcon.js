import React from 'react'
import Fetch from '../../services/Fetch'

const ProfileIcon = ({ id, name }) => {
  console.log('id', id)

  const setProfile = async () => {
    const body = await Fetch.post('/api/v1/profiles', { id })
    console.log('Profile id set to', body)
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