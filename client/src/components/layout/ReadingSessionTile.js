import React, { useState } from 'react'
import SingleError from './SingleError.js'

const ReadingSessionTile = ({ id, book, minutesRead, deleteReadingSession, updateReadingSession }) => {

  const [minutes, setMinutes] = useState(minutesRead) 
  const [error, setError] = useState("")
  
  const handleDeleteClick = () => {
    deleteReadingSession(id)
  }

  const handleUpClick = () => {
    const newMinutes = minutes+1
    if (newMinutes > 0) {
      setError("")
    }
    setMinutes(newMinutes)
    updateReadingSession(id, newMinutes)
  }

  const handleDownClick = () => {
    let newMinutes = minutes
    if (minutes-1 > 0) {
      newMinutes = minutes-1
    } else {
      setError("Minutes cannot be less than 1")
    }
    setMinutes(newMinutes)
    updateReadingSession(id, newMinutes)
  }

  return (
    
    <div className="reading-session-tile">
      <SingleError error={error}/>
      <div className="tile-main">
        <div> 
          <img src={book.thumbnailUrl} className="session-thumbnail"/>
        </div>  
        <div className="tile-right">
          <div className="title">{book.title}</div>
          <div className="author">{book.author}</div>
          <div className="minutes">
            {`${minutesRead} min`}
            <button 
              className='increment-btn'
              onClick={handleUpClick}
            >+
            </button>
            <button 
              className='increment-btn'
              onClick={handleDownClick}
            >-
            </button>
          </div>
        </div>
        <button 
          className="delete-btn"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ReadingSessionTile