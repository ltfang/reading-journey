import React from 'react'
import { DateTime } from 'luxon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

const MonthNavButtons = ({ date, setDate }) => {
  const nextMonth = () => {
    const nextDate = date.plus({month: 1})
    setDate(nextDate)
  }

  const prevMonth = () => {
    const nextDate = date.minus({month: 1})
    setDate(nextDate)
  }

  const thisMonth = () => {
    setDate(DateTime.now())
  }
  return (
    <div className="month-btn-group">
      <FontAwesomeIcon 
        icon={faArrowCircleLeft}
        className="fa-lg month-btn"
        onClick={prevMonth}
      />
      <FontAwesomeIcon 
      icon={faCalendarDay}
      className="fa-lg month-btn"
      onClick={thisMonth}
      />
      <FontAwesomeIcon 
      icon={faArrowCircleRight}
      className="fa-lg month-btn"
      onClick={nextMonth}
      />
    </div>
  )
}

export default MonthNavButtons