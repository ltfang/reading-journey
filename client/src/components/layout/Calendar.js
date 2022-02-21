import React, { useState, useEffect } from 'react'
import { DateTime, Interval } from 'luxon'
import CalendarDay from './CalendarDay'
import MonthNavButtons from './MonthNavButtons'
import Fetch from '../../services/Fetch'

const Calendar = props => {
  const [date, setDate] = useState(DateTime.now())
  const [dailyMinutes, setDailyMinutes] = useState([])

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const weekdayMarkers = weekdays.map(weekday => {
    return <div
      key={weekday} 
      className="weekday-marker"
    >
      {weekday}
    </div>
  })
  
  let firstDay
  if (date.startOf('month').weekday === 7) {
    firstDay = date.startOf('month')
  } else {
    firstDay = date.startOf('month').startOf('week').minus({days: 1})
    //1/30/2022 12 AM
  }
  const lastDay = date.endOf('month').endOf('week')
  // 3/6/2022 11:59 PM

  const getDailyMinutes = async () => {
    const startDay = firstDay.toFormat('yyyyMMdd') 
    const endDay = lastDay.toFormat('yyyyMMdd')
    const body = await Fetch.get(`/api/v1/minutes?start=${startDay}&end=${endDay}`)
    setDailyMinutes(body)
  }
  
  useEffect(() => {
    getDailyMinutes()
  }, [date])

  const daysToDisplay = dailyMinutes.map(day => {
    const dateString = day.date
    const calendarDay = DateTime.fromISO(day.date)
    return <CalendarDay
      key={dateString}
      date={calendarDay}
      anchorDate={date}
      totalMinutes={day.totalMinutes}
    />
  })

  return (
    <div className="calendar">
      <h1 className="cal-header">My Reading Log</h1>
      <div className="calendar-header">
        <h1 className="month">{date.monthLong} {date.year}</h1>
        <MonthNavButtons 
          date={date}
          setDate={setDate}
        />
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