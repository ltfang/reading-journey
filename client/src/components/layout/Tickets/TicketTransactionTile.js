import React from 'react'
import { DateTime } from 'luxon'

const TicketTransactionTile = ({ transaction }) => {
  const date = DateTime.fromISO(transaction.date)
  return (
    <div className="trx-tile grid-x">
      <div className="trx-tile-left cell small-4">
        <div className="trx-tickets">
          {transaction.number}
        </div>
      </div>
      <div className="trx-tile-right cell small-8">
        <div className="trx-tile-right-content">
          <div className="trx-date">
            {date.toLocaleString({
              weekday: 'short',
              month: 'short',
              day: '2-digit'
            })}
          </div>
          <div className="trx-des">
            {transaction.description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketTransactionTile