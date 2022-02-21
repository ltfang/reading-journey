import React, { useState, useEffect } from 'react'
import Fetch from '../../services/Fetch'
import TicketForm from './TicketForm'
import TicketTransactionTile from './TicketTransactionTile'

const TicketsPage = props => {
  const [tickets, setTickets] = useState(0)
  const [recentTransactions, setRecentTransactions] = useState([])

  const getTickets = async () => {
    const body = await Fetch.get('/api/v1/tickets/total')
    setTickets(body.totalTickets)
  }

  const getRecentTransactions = async () => {
    const body = await Fetch.get('/api/v1/tickets/recent')
    setRecentTransactions(body.recentTransactions)
  }

  useEffect(() => {
    getTickets()
    getRecentTransactions()
  }, [tickets])

  const useTickets = async (ticketTransaction) => {
    const responseBody = await Fetch.post('/api/v1/tickets', ticketTransaction)
    if (responseBody.error) {
      alert('You do not have enough tickets!')
    } else {
      setTickets(responseBody.totalTickets)
    }
  }

  const transactions = recentTransactions.map(transaction => {
    return (
      <TicketTransactionTile
        key={transaction.id}
        transaction={transaction}
      />
    )
  })

  return (
    <div>
      <h1 className="page-header">My Tickets - {tickets} tickets</h1>
      <div className="grid-y grid-margin-y ticket-container-main">
        <div className="cell small-8 ticket-form-container">
          <TicketForm 
            useTickets={useTickets}
          />
        </div>
        <div className="cell small-4 trx-container trx-container">
          <h2 className="trx-header">Recently:</h2>
          <div className="trx-subcontainer">
            {transactions}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketsPage