import React, { useContext } from 'react'
import Select from 'react-select'
import Fetch from '../../../services/Fetch'
import { UserContext } from '../../UserContext'

const ProfileDropdown = ({ setCurrentProfile }) => {

  const setProfile = async (id) => {
    const body = await Fetch.update('/api/v1/profiles/current', { id })
    return body
  }

  const { currentUser, currentProfile } = useContext(UserContext)

  const handleOptionChange = async (event) => {
    const body = await setProfile(event.id)
    if (body) {
      setCurrentProfile(event)
    }
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
  if (currentUser.profiles.length > 0) {
    optionsArray = currentUser.profiles.map(profile => {
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