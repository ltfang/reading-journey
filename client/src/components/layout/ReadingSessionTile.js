import React from 'react'

const ReadingSessionTile = ({ id, book, minutesRead, deleteReadingSession }) => {

  const handleClick = () => {
    deleteReadingSession(id)
  }

  return (
    <div className="reading-session-tile">
      <div> 
        <img src={book.thumbnailUrl} className="session-thumbnail"/>
      </div>  
      <div className="tile-right">
        <div className="title">{book.title}</div>
        <div className="author">{book.author}</div>
        <div className="minutes">Read for <span>{minutesRead}</span> minutes</div>
      </div>
      <button 
        className="delete-btn"
        onClick={handleClick}
      >
        Delete
      </button>
    </div>
  )
}

export default ReadingSessionTile