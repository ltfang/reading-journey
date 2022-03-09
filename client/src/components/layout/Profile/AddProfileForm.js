import React, { useState } from 'react'
import Fetch from '../../../services/Fetch'
import ErrorList from '../ErrorList'

const AddProfileForm = ({ setModalIsOpenToFalse, user, setUser, setCurrentProfile }) => {
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
    setUser({
      ...user,
      profiles: [...user.profiles, newProfile]
    })
    setCurrentProfile({...newProfile, label: newProfile.name})
  }

  return (
    <form onSubmit={handleSubmit} className="add-profile-form">
      <ErrorList errors={errors} />
      <div className="profile-form-contents">
        <label htmlFor="profileName">Profile Name</label>
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

export default AddProfileForm