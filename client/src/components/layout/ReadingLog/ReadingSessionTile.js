import React, { useState } from 'react'
import SingleError from '../SingleError'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'

const ReadingSessionTile = ({ id, book, minutesRead, deleteReadingSession, updateReadingSession }) => {

  const [minutes, setMinutes] = useState(minutesRead) 
  const [error, setError] = useState("")
  
  const handleDeleteClick = () => {
    if (confirm('Are you sure you want to delete?')) {
      deleteReadingSession(id)
    }
  }

  const handleUpClick = () => {
    const newMinutes = minutes+1
    if (newMinutes > 0) {
      setError('')
    }
    setMinutes(newMinutes)
    updateReadingSession(id, newMinutes)
  }

  const handleDownClick = () => {
    let newMinutes = minutes
    if (minutes-1 > 0) {
      newMinutes = minutes-1
    } else {
      setError('Minutes cannot be less than 1')
    }
    setMinutes(newMinutes)
    updateReadingSession(id, newMinutes)
  }

  return (
    
    <div className="reading-session-tile">
      <SingleError error={error}/>
      <div className="tile-main grid-x grid-margin-x">
        <div className="tile-left cell small-4"> 
          <img src={book.thumbnailUrl} className="session-thumbnail"/>
        </div>  
        <div className="tile-right cell small-8">
          <div className="title">{book.title}</div>
          <div className="author">{book.author}</div>
          <div className="minutes">
            {`${minutesRead} min`}
            <FontAwesomeIcon icon={faPlusCircle} onClick={handleUpClick} className="plus-minus-icon" />
            <FontAwesomeIcon icon={faMinusCircle} onClick={handleDownClick} className="plus-minus-icon" />
          </div>
        </div>
        <FontAwesomeIcon 
          icon={faTrashAlt}
          className="fa-lg trash" 
          onClick={handleDeleteClick}
        />
      </div>
    </div>
  )
}

export default ReadingSessionTile