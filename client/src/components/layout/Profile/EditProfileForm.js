import React, { useState } from 'react'
import Fetch from '../../../services/Fetch'
import ErrorList from '../ErrorList'

const EditProfileForm = ({ setModalIsOpenToFalse, profiles, setProfiles }) => {
  const [profileName, setProfileName] = useState('')
  const [errors, setErrors] = useState({})

  const createProfile = async (profileName, setErrors) => {
    const body = await Fetch.post('/api/v1/profiles', { profileName }, setErrors)
    return body.newProfile
  }

  const handleInputChange = event => {
    setProfileName(event.currentTarget.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newProfile = await createProfile(profileName, setErrors)
    setModalIsOpenToFalse()
    setProfiles([
      ...profiles,
      newProfile
    ])
    setError('')
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