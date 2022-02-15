import React, { useState } from 'react'
import getAuthorString from '../../services/getAuthorString.js'

const AddBookForm = ({ newReadingSession, setNewReadingSession }) => {
  const [searchTerms, setSearchTerms] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleSearchInputChange = event => {
    setSearchTerms(event.currentTarget.value)
  }

  const searchBooks = async () => {
    try {
      const response = await fetch(`/api/v1/books?searchTerms=${searchTerms}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage);
        throw(error);
      }
      const body = await response.json();
      setSearchResults(body)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`);
    }
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
    const authorString = getAuthorString(result.authors)
 
    return (
      <option 
        key={result.googleBooksId}
        value={result.googleBooksId}
        googlebooksid={result.googleBooksId}
        title={result.title}
        author={authorString}
        thumbnailurl={result.thumbnailUrl}
      >{`${result.title}, ${authorString}`}
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
        <label htmlFor="searchTerms">Search for book</label>
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
