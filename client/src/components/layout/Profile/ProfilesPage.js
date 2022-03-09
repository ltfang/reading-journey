import React, { useState } from 'react'
import ProfileIcon from './ProfileIcon'
import Modal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'
import AddProfileForm from './AddProfileForm'

const ProfilesPage = ({ user, setUser, currentProfile, setCurrentProfile }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }

  const customStyles = {
    content: {
      width: '500px',
      height: '300px',
      transform: 'translate(-50%, -50%)',
      marginLeft: '48%',
      marginTop: '25%',
      borderRadius: '10px',
      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
    }
  }

  const profileIcons = user.profiles.map(profile => {
    let profileIconClassName = 'profile-icon'
    if (profile.id===currentProfile.id) {
      profileIconClassName += ' current'
    }
    return (
      <ProfileIcon
        key={profile.id}
        id={profile.id}
        name={profile.name}
        currentProfile={currentProfile}
        setCurrentProfile={setCurrentProfile}
        user={user}
        setUser={setUser}
        profileIconClassName={profileIconClassName}
      />
    )
  })

  return (
    <div>
      <h1 className="page-header">Profiles</h1>
      <div className="profile-container">
        <h2 className="profile-header">Choose or create a profile:</h2>
        <ul className="profile-ul">
          {profileIcons}
          <div
            className="profile-icon-add"
            onClick={setModalIsOpenToTrue}
          >
            <FontAwesomeIcon 
              icon={faPlus}
              className="fa-lg"
            />
          </div>
        </ul>
      </div>
      <Modal isOpen={modalIsOpen} style={customStyles}>
      <FontAwesomeIcon 
        icon={faTimes}
        className="fa-lg"
        onClick={setModalIsOpenToFalse}
      />
      <AddProfileForm 
        setModalIsOpenToFalse={setModalIsOpenToFalse}
        user={user}
        setUser={setUser}
        setCurrentProfile={setCurrentProfile}
      />
    </Modal>
    </div>
  )
}

export default ProfilesPage