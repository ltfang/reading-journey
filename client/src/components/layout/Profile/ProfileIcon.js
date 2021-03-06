import React, { useState, useContext } from 'react'
import Fetch from '../../../services/Fetch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import EditProfileForm from './EditProfileForm'
import { UserContext } from '../../UserContext'

const ProfileIcon = ({ id, name, setCurrentProfile, setUser, profileIconClassName }) => {

  Modal.setAppElement('#app')
  
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { currentUser } = useContext(UserContext)

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }

  const selectProfile = async () => {
    const body = await Fetch.update('/api/v1/profiles/current', { id })
    if (body) {
      const selectedProfile = currentUser.profiles.find(profile => profile.id===id)
      setCurrentProfile({
        ...selectedProfile,
        label: selectedProfile.name
      })
    }    
  }

  const handleIconClick = async () => {
    await selectProfile()
  }

  const deleteProfile = async () => {
    //first reset the profile to the first profile that is not the deleted profile
    const body = await Fetch.update('/api/v1/profiles/default', { id })
    const deletedProfile = await Fetch.delete('/api/v1/profiles', id)
    if (deletedProfile) {
      const profiles = currentUser.profiles.filter(profile => {
        //Using != instead of !== because of possible type differences
        return profile.id != id
      })
      setUser({
        ...currentUser,
        profiles: profiles
      })
      setCurrentProfile({
        ...body.currentProfile,
        label: body.currentProfile.name
      })
    }
  }

  const handleDeleteClick = () => {
    if (currentUser.profiles.length===1) {
      alert('You must have at least one profile.  If you would like to delete this profile, please create another profile first.')
    } else if (confirm('Are you sure you want to delete this profile? If so, the profile and all associated data will be deleted.')) {
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
        className={profileIconClassName}
        onClick={handleIconClick}>
        <div>{name}</div>
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
      <Modal 
        isOpen={modalIsOpen} 
        style={customStyles} 
      >
          <FontAwesomeIcon 
            icon={faTimes}
            className="fa-lg"
            onClick={setModalIsOpenToFalse}
          />
          <EditProfileForm 
            setModalIsOpenToFalse={setModalIsOpenToFalse}
            id={id}
            setUser={setUser}
            setCurrentProfile={setCurrentProfile}
          />
      </Modal>
    </div>
  )
}

export default ProfileIcon