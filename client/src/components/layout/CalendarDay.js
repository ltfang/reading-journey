import React, { useState, useEffect } from 'react'
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

  return (
    <div className="calendarDay">
      <div className={dateNumberClass}>{date.day}</div>
    </div>
  )
}

export default CalendarDay

//{firstDay.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}