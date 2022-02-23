import React, { useState } from 'react'
import getAuthorString from '../../../services/getAuthorString.js'
import Fetch from '../../../services/Fetch.js'
import SingleError from '../SingleError.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'

const AddBookForm = ({ newReadingSession, setNewReadingSession, searchTerms, setSearchTerms }) => {
  const [searchResults, setSearchResults] = useState([])
  const [error, setError] = useState("")
  const [selectedOption, setSelectedOption] = useState(null)

  const handleSearchInputChange = event => {
    setSearchTerms(event.currentTarget.value)
  }

  const searchBooks = async () => {
    const body = await Fetch.get(`/api/v1/book-search?searchTerms=${searchTerms}`)
    setSearchResults(body)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    if (validForSubmission()) {
      searchBooks()
    }
    setSelectedOption("")
  }

  const validForSubmission = () => {
    const submitError = "Please enter search terms"
    if (searchTerms.trim()==="") {
      setError(submitError)
      return false
    }
    return true
  }

  const handleOptionChange = (event) => { 
    setSelectedOption(event)
    const selectedBook = {
      googleBooksId: event.googleBooksId,
      title: event.title,
      author: event.author,
      thumbnailUrl: event.thumbnailUrl
    }
    setNewReadingSession({
      ...newReadingSession,
      book: selectedBook
    })
  }

  let optionsArray = null
  let resultsDisplay = null

  if (searchResults===null) {
    resultsDisplay =    
    <div>No results</div>
  } else if (searchResults.length>0) { 
    optionsArray = searchResults.map(result => {
      let authorString = result.author
      if (typeof authorString !== 'string') {
        authorString = getAuthorString(result.authors)
      }
      
      let indicatePriorBook = ''
      if (result.id) {
        indicatePriorBook = '*MY BOOKSHELF*'
      }

      return (
        { 
          googleBooksId: result.googleBooksId,
          title: result.title,
          author: authorString,
          thumbnailUrl: result.thumbnailUrl,
          label: 
            <div className="option">
              <div>
                <div className="option-title">{result.title}</div>
                <div>{authorString}</div> 
                <div className="indicate-prior-book">{indicatePriorBook}</div>
              </div>
              <div>
                <img src={result.thumbnailUrl} className="option-image"/>
              </div>
            </div>
        }
      )
    })

    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted black',
        backgroundColor: 'white',
        color: 'black'
      })
    }
    
    resultsDisplay =    
    <form>
      <Select
        placeholder="Search results..."
        styles={customStyles}
        value={selectedOption}
        options={optionsArray}
        onChange={handleOptionChange}
      />
    </form>
  } 

  return (
    <div>
      <form onSubmit={handleSubmit} className="add-book-form">
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
            <button
              type="submit"
            >
              <FontAwesomeIcon 
                icon={faSearch}
                className="search-icon fa-lg"
              />
            </button>
          </div>  
      </form>
      <SingleError error={error} />
      {resultsDisplay}
    </div>
  )
}

export default AddBookForm
