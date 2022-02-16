import React, { useState, useEffect } from 'react'
import { DateTime, Interval } from 'luxon'
import CalendarDay from './CalendarDay'

const Calendar = props => {
  const [date, setDate] = useState(DateTime.now())
  
  let firstDay
  if (date.startOf('month').weekday === 7) {
    firstDay = date.startOf('month')
  } else {
    firstDay = date.startOf('month').startOf('week').minus({days: 1})
  }
  const lastDay = date.endOf('month').endOf('week').minus({days: 1})
  let interval = Interval.fromDateTimes(firstDay, lastDay)

  const daysToDisplay = interval.splitBy({days:1}).map(d=> {
    return <CalendarDay 
      key={d}
      date={d.start} 
      anchorDate={date}
    />
  })

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const weekdayMarkers = weekdays.map(weekday => {
    return <div
      key={weekday} 
      className="weekday-marker"
    >
      {weekday}
    </div>
  })

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
    <div className="calendar">
    <h1 className="header">My Reading Log</h1>
      <div className="calendar-header">
        <h1 className="month">{date.monthLong} {date.year}</h1>
        <div className="month-btn-group">
          <button 
          className="month-btn"
          onClick={prevMonth}
          >prev
          </button>
          <button 
          className="month-btn"
          onClick={nextMonth}
          >next
          </button>
          <button 
          className="month-btn"
          onClick={thisMonth}
          >today
          </button>
        </div>
      </div>
      <div className="weekday-container">
        {weekdayMarkers} 
      </div>
      <div className="days-container">
        {daysToDisplay}
      </div>
    </div>
  )
}

export default Calendar