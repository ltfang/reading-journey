import React, { useState } from 'react'
import Fetch from '../../../services/Fetch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import EditProfileForm from './EditProfileForm'

const ProfileIcon = ({ id, name, setProfile, user, setUser }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }

  const selectProfile = async () => {
    const body = await Fetch.update('/api/v1/profiles', { id })
    if (body) {
      const selectedProfile = user.profiles.find(profile => profile.id===id)
      setProfile({
        ...selectedProfile,
        label: selectedProfile.name
      })
    }    
  }

  const handleIconClick = async () => {
    await selectProfile()
    //include redirect to new home screen
  }

  const deleteProfile = async () => {
    const deletedProfile = await Fetch.delete('/api/v1/profiles', id)
    if (deletedProfile) {
      const profiles = user.profiles.filter(profile => {
        profile.id !== id
      })
      setUser({
        ...user,
        profiles: profiles
      })
    }
  }

  const handleDeleteClick = () => {
    if (confirm('Are you sure you want to delete?')) {
      deleteProfile()
    }
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
  
  return (
    <div>
      <div 
        className="profile-icon"
        onClick={handleIconClick}>
        {name}
        <div className="profile-small-icon-wrapper">
          <FontAwesomeIcon
            icon={faPen}
            onClick={setModalIsOpenToTrue}
            className="profile-small-icon fa-2xs"
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={handleDeleteClick}
            className="profile-small-icon fa-2xs"
          />
        </div>
      </div>
      <Modal isOpen={modalIsOpen} style={customStyles}>
          <FontAwesomeIcon 
            icon={faTimes}
            className="fa-lg"
            onClick={setModalIsOpenToFalse}
          />
          <EditProfileForm 
            setModalIsOpen={setModalIsOpen}
          />
      </Modal>
    </div>
  )
}

export default ProfileIcon