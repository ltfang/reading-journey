import React, { useState } from 'react'
import Fetch from '../../../services/Fetch'
import ErrorList from '../ErrorList'

const EditProfileForm = ({ setModalIsOpenToFalse, id, user, setUser, currentProfile, setCurrentProfile }) => {
  const [profileName, setProfileName] = useState('')
  const [errors, setErrors] = useState({})

  const updateProfile = async (profileName, setErrors) => {
    const body = await Fetch.update('/api/v1/profiles', { id, profileName }, setErrors)
    return body.updatedProfile
  }

  const handleInputChange = event => {
    setProfileName(event.currentTarget.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const body = await updateProfile(profileName, setErrors)
    if (body) {
      const profiles = [...user.profiles]
      const updatedProfile = profiles.find(profile=>profile.id===id)
      updatedProfile.name = profileName
      setUser({
        ...user,
        profiles: profiles
      })
      setCurrentProfile({
        ...currentProfile,
        name: profileName,
        label: profileName
      })
      setModalIsOpenToFalse()
    }    
  }

  return (
    <form onSubmit={handleSubmit} className="add-profile-form">
      <ErrorList errors={errors} />
      <div className="profile-form-contents">
        <label htmlFor="profileName">Edit Profile Name</label>
        <input
          id="profileName"
          name="profileName"
          type="text" 
          value={profileName}
          onChange={handleInputChange}
        />
        <input 
          type="submit" 
          className="app-btn"
        />
      </div>
    </form>
  )
}

export default EditProfileForm