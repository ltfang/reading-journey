import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const CalendarDay = ({ date, anchorDate, totalMinutes }) => {
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

  let minutesDisplay
  if (totalMinutes > 0) {
    minutesDisplay = 
    <div>
      <FontAwesomeIcon icon={faStar} className="calendar-star fa-2xl" />
      <div className="calendar-minute">{totalMinutes}</div>
    </div>
  }

  return (
    <div className="calendarDay">
      <div className={dateNumberClass}>{date.day}</div>
      {minutesDisplay}
      <Link to= {`/log/${dateString}`}>
        Link to Sessions
      </Link>
    </div>
  )
}

export default CalendarDay