import React from 'react'
import { DateTime } from 'luxon'

const TicketTransactionTile = ({ transaction }) => {
  const date = DateTime.fromISO(transaction.date)
  return (
    <div className="trx-tile">
      <div className="tile-top">
        <div className="trx-date">
          {date.toLocaleString({
            weekday: 'long',
            month: 'short',
            day: '2-digit'
          })}
        </div>
        <div className="trx-tickets">
          {transaction.number} tickets
        </div>
        </div>
      <div className="trx-des">
        {transaction.description}
      </div>
    </div>
  )
}

export default TicketTransactionTile