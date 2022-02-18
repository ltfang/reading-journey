import React, { useState, useEffect } from 'react'
import BookTile from './BookTile'
import Fetch from '../../services/Fetch'

const Bookshelf = props => {
  const [books, setBooks] = useState([])

  const getBooks = async () => {
    const body = await Fetch.get('/api/v1/books')
    setBooks(body)
  }

  useEffect(()=> {
    getBooks()
  }, [])

  const bookList = books.map( book => {
    return (
      <BookTile
        key={book.id}
        book={book}
      />
    )
  })

  return(
    <div className="bookshelf">
      <h1 className="bookshelf-header">My Bookshelf</h1>
      <div className="bookshelf-container">
        {bookList}
      </div>
    </div>
  )
}

export default Bookshelf