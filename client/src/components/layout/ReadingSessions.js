import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import ReadingSessionTile from './ReadingSessionTile'

const ReadingSessions = (props) => {
  // Need to fetch all existing reading sessions for the day
  const [readingSessions, setReadingSessions] = useState([])

  const date = DateTime.fromFormat(props.match.params.date, 'yyyyMMdd')
  const formattedDate = date.toLocaleString(DateTime.DATE_FULL)
  
  const getReadingSessions = async () => {
    try {
      const response = await fetch(`/api/v1/log/${props.match.params.date}`)
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const body = await response.json()
      setReadingSessions(body.readingSessions)
    } catch (error) {
      console.error(`Error in fetch: ${error}`)
    }
  }

  useEffect(() => {
    getReadingSessions()
  }, [])

  const readingSessionList = readingSessions.map(readingSession => {
    return (
      <ReadingSessionTile 
        key={readingSession.id}
        book={readingSession.book}
        minutesRead={readingSession.minutesRead}
      />
    )
  })

  return (
    <div>
      <h1 className="header">Reading Sessions</h1>
      <h2 className="header2">{formattedDate}</h2>
      {readingSessionList}
    </div>
  )
}

export default ReadingSessions