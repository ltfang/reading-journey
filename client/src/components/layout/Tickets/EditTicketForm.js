import React, { useState } from 'react'
import { DateTime } from 'luxon'

const EditTicketForm = ({ transaction, editTicketUse, setModalIsOpen }) => {
  const transactionDateObject = DateTime.fromISO(transaction.date)

  const [ticketTransaction, setTicketTransaction] = useState({
    id: transaction.id,
    date: transactionDateObject.toFormat('yyyy-MM-dd'),
    number: transaction.number,
    description: transaction.description
  })

  const handleInputChange = (event) => {
    setTicketTransaction({
      ...ticketTransaction,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = editTicketUse(ticketTransaction)
    console.log('result', result)
    if(result) {
      setModalIsOpen(false)
    }
  }

  return(
    <div>
      <form onSubmit={handleSubmit} className="edit-ticket-form">
        <h2 className="edit-ticket-form-header">Edit your ticket use from {transactionDateObject.toLocaleString({
          weekday: 'short',
          month: 'short',
          day: '2-digit'
        })}</h2>
        <div className="input-container">
          <label htmlFor="date">When did you use them?
            <input 
              id="date"
              name="date"
              type="date"
              onChange={handleInputChange}
              value={ticketTransaction.date}
            />
          </label>
        </div>
        <div className="input-container">
          <label htmlFor="number">How many did you use?
            <input 
              id="number"
              name="number"
              type="number"
              onChange={handleInputChange}
              min={1}
              value={ticketTransaction.number}
            />
          </label>
        </div>
        <div className="input-container">
          <label htmlFor="description">What did you use them for?
            <input 
              id="description"
              name="description"
              type="text"
              onChange={handleInputChange}
              value={ticketTransaction.description}
            />
          </label>
        </div>
          <input 
            type="submit" 
            value="Submit"
            className="app-btn"
          />
      </form>
    </div>
  )
}

export default EditTicketForm