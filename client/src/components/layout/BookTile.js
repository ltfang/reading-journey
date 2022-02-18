import React, { useState, useEffect } from 'react'

const BookTile = ({ book }) => {
  return(
    <div className="book-tile">
      <img src={book.thumbnailUrl}/>
      <div>{book.title}</div>
      <div>{book.author}</div>
    </div>
  )
}

export default BookTile