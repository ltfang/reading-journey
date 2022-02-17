import React, { useState, useEffect } from 'react'
import Fetch from '../../services/Fetch'

const TicketsPage = props => {
  const [tickets, setTickets] = useState(0)

  const getTickets = async () => {
    const body = await Fetch.get('/api/v1/tickets')
    setTickets(body.totalTickets)
  }

  useEffect(() => {
    getTickets()
  }, [])

  //include form for debiting tickets

  return (
    <div>
      <h1>Use Your Tickets!</h1>
      <h2>You have {tickets} tickets</h2>
    </div>
  )
}

export default TicketsPage