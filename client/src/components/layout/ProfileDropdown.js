import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import Fetch from '../../services/Fetch'

const ProfileDropdown = ({ user, currentProfile, setCurrentProfile }) => {

  const setProfile = async (id) => {
    await Fetch.post('/api/v1/profiles', { id })
  }

  const handleOptionChange = async (event) => {
    await setProfile(event.id)
    setCurrentProfile(event)
  }

  let optionsArray = null
  if (user.profiles.length > 0) {
    optionsArray = user.profiles.map(profile => {
      return (
        {
          id: profile.id,
          label: profile.name,
          name: profile.name
        }
      )
    })
  }
  return (
    <form>
      <Select
        value={currentProfile}
        options={optionsArray}
        onChange={handleOptionChange}
      />
    </form>
  )
}

export default ProfileDropdown