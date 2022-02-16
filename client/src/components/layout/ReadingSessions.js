import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import ReadingSessionTile from './ReadingSessionTile'
import ReadingSessionForm from './ReadingSessionForm'
import Fetch from '../../services/Fetch'

const ReadingSessions = (props) => {
  const [readingSessions, setReadingSessions] = useState([])
  const [totalMinutes, setTotalMinutes] = useState(null)

  const date = DateTime.fromFormat(props.match.params.date, 'yyyyMMdd')
  const formattedDate = date.toLocaleString(DateTime.DATE_FULL)

  const getReadingSessions = async () => {
    const body = await Fetch.get(`/api/v1/log/${props.match.params.date}`)
    setReadingSessions(body.readingSessions)
    setTotalMinutes(body.totalMinutes)
  }

  useEffect(() => {
    getReadingSessions()
  }, [])

  const postReadingSession = async (newReadingSession) => {
    const responseBody = await Fetch.post(`/api/v1/log/${props.match.params.date}`, newReadingSession)
    setReadingSessions([...readingSessions, responseBody.newReadingSession])
    setTotalMinutes(totalMinutes+responseBody.newReadingSession.minutesRead)
  }

  const deleteReadingSession = async (readingSessionId) => {
    await Fetch.delete(`/api/v1/log/${props.match.params.date}`, readingSessionId)
    const updatedReadingSessions = readingSessions.filter(readingSession => readingSession.id != readingSessionId)
    const deletedReadingSession = readingSessions.find(readingSession=> readingSession.id === readingSessionId)
    setTotalMinutes(totalMinutes-deletedReadingSession.minutesRead)
    setReadingSessions(updatedReadingSessions)
  }

  const updateReadingSession = async (readingSessionId, minutes) => {
    await Fetch.update(`/api/v1/log/${props.match.params.date}`, readingSessionId, minutes)
    const updatedReadingSessions = [...readingSessions]
    const session = updatedReadingSessions.find(readingSession => readingSession.id === readingSessionId)
    setTotalMinutes(totalMinutes-(session.minutesRead-minutes))
    session.minutesRead = minutes
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
        updateReadingSession={updateReadingSession}
      />
    )
  })

  return (
    <div>
      <h1 className="header">{formattedDate}</h1>
      <h2 className="header2">Total reading time: {totalMinutes} min</h2>
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