import React from 'react'

const ReadingSessionTile = ({ book, minutesRead }) => {
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
    </div>
  )
}

export default ReadingSessionTile