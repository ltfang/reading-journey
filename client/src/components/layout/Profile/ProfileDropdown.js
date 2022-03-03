import React from 'react'
import Select from 'react-select'
import Fetch from '../../../services/Fetch'

const ProfileDropdown = ({ user, currentProfile, setCurrentProfile }) => {

  const setProfile = async (id) => {
    await Fetch.update('/api/v1/profiles', { id })
  }

  const handleOptionChange = async (event) => {
    await setProfile(event.id)
    setCurrentProfile(event)
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted black',
      backgroundColor: 'white',
      color: 'black'
    }),
    container: () => ({
      width: '130px'
    })
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
    <form className="profile-dropdown">
      <Select
        value={currentProfile}
        styles={customStyles}
        options={optionsArray}
        onChange={handleOptionChange}
      />
    </form>
  )
}

export default ProfileDropdown