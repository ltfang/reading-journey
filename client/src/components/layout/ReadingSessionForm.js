import React, { useState } from 'react'
import AddBookForm from './AddBookForm'

const ReadingSessionForm = ({ date, postReadingSession }) => {

  const [newReadingSession, setNewReadingSession] = useState({
    date: date,
    minutesRead: 0,
    book: {}
  })

  const handleInputChange = (event) => {
    setNewReadingSession({
      ...newReadingSession,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postReadingSession(newReadingSession)
  }

  return (
    <>
      <h2 className="add-read-header">Add a New Read</h2>
      <AddBookForm 
        setNewReadingSession={setNewReadingSession}
        newReadingSession={newReadingSession}
      />
      <form onSubmit={handleSubmit}>
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