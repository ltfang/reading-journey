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
  }
  const lastDay = date.endOf('month').endOf('week').minus({days: 1})
  
  let interval = Interval.fromDateTimes(firstDay, lastDay)

  const getDailyMinutes = async () => {
    const startDay = firstDay.toFormat('yyyyMMdd') 
    const endDay = lastDay.toFormat('yyyyMMdd')
    const body = await Fetch.get(`/api/v1/minutes?start=${startDay}&end=${endDay}`)
    setDailyMinutes(body)
  }
  
  useEffect(() => {
    getDailyMinutes()
  }, [])

  let daysToDisplay
  if (dailyMinutes.length>0) {
    daysToDisplay = interval.splitBy({days:1}).map((d, index) => {
      return <CalendarDay 
      key={d}
      date={d.start} 
      anchorDate={date}
      totalMinutes={Object.values(dailyMinutes[index])[0]}
      />
    })
  }

  return (
    <div className="calendar">
      <h1 className="header">My Reading Log</h1>
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