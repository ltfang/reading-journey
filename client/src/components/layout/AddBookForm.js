import React, { useState } from 'react'
import getAuthorString from '../../services/getAuthorString.js'
import Fetch from '../../services/Fetch.js'

const AddBookForm = ({ newReadingSession, setNewReadingSession }) => {
  const [searchTerms, setSearchTerms] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleSearchInputChange = event => {
    setSearchTerms(event.currentTarget.value)
  }

  const searchBooks = async () => {
    const body = await Fetch.get(`/api/v1/book-search?searchTerms=${searchTerms}`)
    setSearchResults(body)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    searchBooks()
  }

  const handleOptionChange = (event) => { 
    const selectedBook = {
      googleBooksId: event.currentTarget.selectedOptions[0].getAttribute('googlebooksid'),
      title: event.currentTarget.selectedOptions[0].getAttribute('title'),
      author: event.currentTarget.selectedOptions[0].getAttribute('author'),
      thumbnailUrl: event.currentTarget.selectedOptions[0].getAttribute('thumbnailurl')
    }
    setNewReadingSession({
      ...newReadingSession,
      book: selectedBook
    })
  }

  const optionsArray = searchResults.map(result => {
    let authorString = result.author
    if (typeof authorString !== 'string') {
      authorString = getAuthorString(result.authors)
    }

    let indicatePriorBook = ''
    if (result.id) {
      indicatePriorBook = '*MY BOOKSHELF*'
    }
 
    return (
      <option 
        key={result.googleBooksId}
        value={result.googleBooksId}
        googlebooksid={result.googleBooksId}
        title={result.title}
        author={authorString}
        thumbnailurl={result.thumbnailUrl}
      >{`${result.title}, ${authorString} ${indicatePriorBook}` }
      </option>
    )
  })

  let resultsDisplay = null
  if (searchResults.length>0) {
    resultsDisplay =    
    <form>
      <select onChange={handleOptionChange}>
        <option>Search Results</option>
        {optionsArray}
      </select>
  </form>
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchTerms">Add book</label>
          <div className="search-submit-container">
            <input
              className="search-input"
              id="searchTerms"
              name="searchTerms"
              type="text"
              onChange={handleSearchInputChange}
              value={searchTerms}
            />
            <input 
              className="search-submit app-btn"
              type="submit"
              value="Search"
            />     
          </div>  
      </form>
      {resultsDisplay}
    </div>
  )
}

export default AddBookForm
