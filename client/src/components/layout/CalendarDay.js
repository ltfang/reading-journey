import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'

const CalendarDay = ({ date, anchorDate }) => {

  let dateNumberClass = 'dateNumber'

  if (
    date.day === DateTime.now().day 
    && date.month === DateTime.now().month 
    && date.year === DateTime.now().year) {
    dateNumberClass += ' today'
  } else if (date.month !== anchorDate.month) {
    dateNumberClass += ' other-month'
  }

  const dateString = date.toFormat('yyyyMMdd')
  
  return (
    <div className="calendarDay">
      <div className={dateNumberClass}>{date.day}</div>
      <Link to={`/log/${dateString}`}>
        Link to Sessions
      </Link>
    </div>
  )
}

export default CalendarDay