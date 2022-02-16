import React from 'react'
import { DateTime } from 'luxon'

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
  )
}

export default MonthNavButtons