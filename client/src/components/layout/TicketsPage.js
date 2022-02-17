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
      <h1 className="ticket-header">You have {tickets} tickets!</h1>
      <div className="grid-x grid-margin-x">
        <div className="cell small-8">
          <TicketForm 
            useTickets={useTickets}
          />
        </div>
        <div className="cell small-4 trx-container">
          <h2 className="trx-header">Recent Transactions</h2>
          {transactions}
        </div>
      </div>
    </div>
  )
}

export default TicketsPage