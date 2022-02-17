import React, { useState } from 'react'
import { DateTime } from 'luxon'

const TicketForm = ({ useTickets }) => {
  
  const [ticketTransaction, setTicketTransaction] = useState({
    date: DateTime.now().toFormat('yyyy-MM-dd'),
    number: 0,
    description: ""
  })

  const handleInputChange = (event) => {
    setTicketTransaction({
      ...ticketTransaction,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    useTickets(ticketTransaction)
    clearForm()
  }

  const clearForm = () => {
    setTicketTransaction({
      date: DateTime.now().toFormat('yyyy-MM-dd'),
      number: 0,
      description: ""
    })
  }

  return(
    <div>
      <form onSubmit={handleSubmit} className="ticket-form">
        <h2 className="ticket-form-header">Use your tickets!</h2>
        <label htmlFor="date">Date
          <input 
            id="date"
            name="date"
            type="date"
            onChange={handleInputChange}
            value={ticketTransaction.date}
          />
        </label>
        <label htmlFor="number">Tickets to Use
          <input 
            id="number"
            name="number"
            type="number"
            onChange={handleInputChange}
            min={1}
            value={ticketTransaction.number}
          />
        </label>
        <label htmlFor="description">Description
          <input 
            id="description"
            name="description"
            type="text"
            onChange={handleInputChange}
            value={ticketTransaction.description}
          />
        </label>
          <input 
            type="submit" 
            value="Use tickets!"
          />
      </form>
    </div>
  )
}

export default TicketForm