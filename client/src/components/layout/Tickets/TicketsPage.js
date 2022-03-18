import React, { useState, useEffect, useContext } from 'react'
import Fetch from '../../../services/Fetch'
import TicketForm from './TicketForm'
import TicketTransactionTile from './TicketTransactionTile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../UserContext'

const TicketsPage = (props) => {
  const [tickets, setTickets] = useState(0)
  const [recentTransactions, setRecentTransactions] = useState([])
  const { currentProfile } = useContext(UserContext)

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
  }, [tickets, currentProfile])

  const useTickets = async (ticketTransaction) => {
    const responseBody = await Fetch.post('/api/v1/tickets', ticketTransaction)
    if (responseBody.error) {
      alert('You do not have enough tickets!')
    } else {
      setTickets(responseBody.totalTickets)
    }
  }

  const editTicketUse = async (ticketTransaction) => {
    const responseBody = await Fetch.update('/api/v1/tickets', ticketTransaction)
    if (responseBody.error) {
      alert('You do not have enough tickets!')
      return false
    } else {
      setTickets(responseBody.totalTickets)
    }
  }

  const deleteTicketUse = async (body) => { 
    const responseBody = await Fetch.delete('/api/v1/tickets', body)
    setTickets(responseBody.totalTickets)
  }

  const transactions = recentTransactions.map(transaction => {
    return (
      <TicketTransactionTile
        key={transaction.id}
        transaction={transaction}
        editTicketUse={editTicketUse}
        deleteTicketUse={deleteTicketUse}
      />
    )
  })

  return (
    <div>
      <div className="ticket-header">
        <h1 className="page-header">{currentProfile.name}'s Tickets</h1>
        <div className="ticket-page-icon-wrapper">
          <FontAwesomeIcon 
            icon={faTicketAlt}
            className="fa-7x ticket-page-icon"
          />
          <h2 className="total-tickets">{tickets}</h2>
        </div>
      </div>
      <div className="grid-y grid-margin-y ticket-container-main">
        <div className="cell small-8 ticket-form-container">
          <TicketForm 
            useTickets={useTickets}
          />
        </div>
        <div className="cell small-4 trx-container trx-container">
          <h2 className="trx-header">Recent usages:</h2>
          <div className="trx-subcontainer">
            {transactions}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketsPage