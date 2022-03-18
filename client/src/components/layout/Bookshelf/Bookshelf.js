import React, { useState, useEffect, useContext } from 'react'
import BookTile from './BookTile'
import Fetch from '../../../services/Fetch'
import BookSearch from './BookSearch'
import BookSort from './BookSort'
import _ from 'lodash'
import SortBooks from '../../../services/SortBooks.js'
import { ProfileContext } from '../../ProfileContext'

const Bookshelf = (props) => {
  const [books, setBooks] = useState([])
  const [searchText, setSearchText] = useState('')
  const [sortCriterion, setSortCriterion] = useState(null)
  const currentProfile = useContext(ProfileContext)

  const getBooks = async () => {
    const body = await Fetch.get('/api/v1/books')
    setBooks(body)
  }

  useEffect(()=> {
    getBooks()
  }, [currentProfile])

  let displayedBooks = books.filter(book => {
    return book.title.toLowerCase().includes(searchText)
  })

  if (sortCriterion) {
    if (sortCriterion==="title") {
      displayedBooks = SortBooks.sortByTitle(displayedBooks)
    } 
    else if (sortCriterion==="author") {
      displayedBooks = SortBooks.sortByAuthor(displayedBooks)
    }
  }

  const bookList = displayedBooks.map( book => {
    return (
      <BookTile
        key={book.id}
        book={book}
      />
    )
  })

  return(
    <div className="bookshelf">
      <div className="search-filter-container">
        <BookSearch 
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <BookSort 
          setSortCriterion={setSortCriterion}
        />
      </div>
      <h1 className="page-header">{currentProfile.name}'s Bookshelf</h1>
      <div className="bookshelf-container">
        {bookList}
      </div>
    </div>
  )
}

export default Bookshelf
