import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import ReadingSessionTile from './ReadingSessionTile'
import ReadingSessionForm from './ReadingSessionForm'
import Fetch from '../../services/Fetch'

const ReadingSessions = (props) => {
  const [readingSessions, setReadingSessions] = useState([])

  const date = DateTime.fromFormat(props.match.params.date, 'yyyyMMdd')
  const formattedDate = date.toLocaleString(DateTime.DATE_FULL)

  const getReadingSessions = async () => {
    const body = await Fetch.get(`/api/v1/log/${props.match.params.date}`)
    setReadingSessions(body.readingSessions)
  }

  useEffect(() => {
    getReadingSessions()
  }, [])

  const postReadingSession = async (newReadingSession) => {
    const responseBody = await Fetch.post(`/api/v1/log/${props.match.params.date}`, newReadingSession)
    setReadingSessions([...readingSessions, responseBody.newReadingSession])
  }

  const deleteReadingSession = async (readingSessionId) => {
    await Fetch.delete(`/api/v1/log/${props.match.params.date}`, readingSessionId)
    const updatedReadingSessions = readingSessions.filter(readingSession => readingSession.id != readingSessionId)
    setReadingSessions(updatedReadingSessions)
  }

  const readingSessionList = readingSessions.map(readingSession => {
    return (
      <ReadingSessionTile 
        key={readingSession.id}
        id={readingSession.id}
        book={readingSession.book}
        minutesRead={readingSession.minutesRead}
        deleteReadingSession={deleteReadingSession}
      />
    )
  })

  return (
    <div>
      <h1 className="header">{formattedDate}</h1>
      <div className="grid-x grid-margin-x reading-session-bottom">
        <div className="cell small-6 form-container">
          <ReadingSessionForm 
            date={date}
            postReadingSession={postReadingSession}
          />
        </div>
        <div className="reading-session-list cell small-6">
          {readingSessionList}
        </div>
      </div>
    </div>
  )
}

export default ReadingSessions