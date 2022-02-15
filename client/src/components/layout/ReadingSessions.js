import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import ReadingSessionTile from './ReadingSessionTile'
import ReadingSessionForm from './ReadingSessionForm'

const ReadingSessions = (props) => {
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

  const postReadingSession = async (newReadingSession) =>{
    try {
      console.log("newReadingSession", newReadingSession)
      const response = await fetch(`/api/v1/log/${props.match.params.date}`, {
        method:"POST",
        headers: new Headers ({
          "Content-Type" : "application/json"
        }),
        body: JSON.stringify(newReadingSession),
      });
      if(!response.ok){
        if(response.status === 422){
          const responseBody = await response.json()
        } else{
          throw (new Error(`${response.status} ${response.statusText}`))
        }
      }
      const responseBody = await response.json()
      setReadingSessions([...readingSessions, responseBody.newReadingSession])
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

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
      <h1 className="header">{formattedDate}</h1>
      <div className="grid-x grid-margin-x reading-session-bottom">
        <div className="reading-session-list cell small-6">
          {readingSessionList}
        </div>
        <div className="cell small-6 form-container">
          <ReadingSessionForm 
            date={date}
            postReadingSession={postReadingSession}
          />
        </div>
      </div>
    </div>
  )
}

export default ReadingSessions