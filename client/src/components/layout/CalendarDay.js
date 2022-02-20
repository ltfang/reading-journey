import React from 'react'
import { useHistory } from 'react-router-dom'
import { DateTime } from 'luxon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const CalendarDay = ({ date, anchorDate, totalMinutes }) => {
  let dateNumberClass = 'dateNumber'
  const firstAllowableDate = DateTime.local(2020, 1, 1)

  if (
    date.day === DateTime.now().day 
    && date.month === DateTime.now().month 
    && date.year === DateTime.now().year
    ) {
    dateNumberClass += ' today'
  } else if (date.month !== anchorDate.month) {
    dateNumberClass += ' other-month'
  }

  let calendarDayClass = 'calendarDay'
  if (date > DateTime.now() || date < firstAllowableDate) {
    calendarDayClass += ' disabled'
  } else {
    calendarDayClass += ' active'
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

  const history = useHistory()
  const handleClick = () => {
    if (date <= DateTime.now() && date >= firstAllowableDate) {
      history.push(`/log/${dateString}`)
    }
  }

  return (
    <div className={calendarDayClass} onClick={handleClick}>
      <div className={dateNumberClass}>{date.day}</div>
      {minutesDisplay}
    </div>
  )
}

export default CalendarDay