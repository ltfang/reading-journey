import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'

const ReadingSessionForm = (props) => {
  // Need to fetch all existing reading sessions for the day
  
  const date = DateTime.fromFormat(props.match.params.date, 'yyyymmdd')
  const formattedDate = date.toLocaleString(DateTime.DATE_FULL)

  return (
    <div>
      <h1>Reading Sessions for {formattedDate}</h1>
    </div>
  )
}

export default ReadingSessionForm