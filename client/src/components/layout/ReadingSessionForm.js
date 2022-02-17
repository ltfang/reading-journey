import React, { useState } from 'react'
import AddBookForm from './AddBookForm'
import SingleError from './SingleError.js'
import _ from 'lodash'

const ReadingSessionForm = ({ date, postReadingSession }) => {

  const [newReadingSession, setNewReadingSession] = useState({
    date: date,
    minutesRead: 0,
    book: {}
  })

  const [searchTerms, setSearchTerms] = useState('')

  const [error, setError] = useState("")

  const handleInputChange = (event) => {
    setNewReadingSession({
      ...newReadingSession,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () => {
    const submitError = "Please select book"
    if (_.isEmpty(newReadingSession.book)) {
      setError(submitError)
      return false
    }
    return true
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validForSubmission()) {
      postReadingSession(newReadingSession)
      clearForm()
    }
  }

  const clearForm = () => {
    setSearchTerms('')
    setNewReadingSession({
      date: date,
      minutesRead: 0,
      book: {}
    })
    setError('')
  }

  return (
    <>
      <h2 className="add-read-header">Add a New Read</h2>      
      <AddBookForm 
        setNewReadingSession={setNewReadingSession}
        newReadingSession={newReadingSession}
        setSearchTerms={setSearchTerms}
        searchTerms={searchTerms}
      />
      <form onSubmit={handleSubmit}>
      <SingleError error={error} />
        <label htmlFor="minutesRead"> Minutes Read
          <input
            className="minutesRead"
            name="minutesRead"
            id="minutesRead"
            type="number"
            min={1}
            onChange={handleInputChange}
            value={newReadingSession.minutesRead}
          />
        </label>

      <input type="submit" className="app-btn"></input>
      </form>
    </>
  )
}

export default ReadingSessionForm