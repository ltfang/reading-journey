import React, { useState, useEffect } from 'react'

const BookTile = ({ book }) => {
  return(
    <div className="book-tile grid-y">
      <div className="book-tile-top cell small-7">
        <img src={book.thumbnailUrl} className="book-tile-img"/>
      </div>
      <div className="book-tile-bottom cell small-5">
        <div className="book-tile-bottom-content">
          <div className="book-tile-title">{book.title}</div>
          <div className="book-tile-author">{book.author}</div>
        </div>
      </div>
    </div>
  )
}

export default BookTile