import React, { useState } from 'react'
import { DateTime } from 'luxon'
import Modal from 'react-modal'
import EditTicketForm from './EditTicketForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const TicketTransactionTile = ({ transaction, editTicketUse, deleteTicketUse }) => {
  const date = DateTime.fromISO(transaction.date)

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }

  const customStyles = {
    content: {
      width: '700px',
      height: '500px',
      transform: 'translate(-50%, -50%)',
      marginLeft: '48%',
      marginTop: '25%',
      borderRadius: '10px'
    }
  }

  const handleDeleteClick = () => {
    if (confirm('Are you sure you want to delete?')) {
      deleteTicketUse(transaction.id)
    }
  }

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
        <div className="ticket-icon-wrapper">
            <FontAwesomeIcon
              icon={faPen}
              onClick={setModalIsOpenToTrue}
              className="ticket-pen-icon"
            />
            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={handleDeleteClick}
              className="ticket-trash-icon"
            />
          </div>
      </div>
      <div>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <FontAwesomeIcon 
          icon={faTimes}
          className="fa-lg"
          onClick={setModalIsOpenToFalse}
        />
        <EditTicketForm 
          transaction={transaction}
          editTicketUse={editTicketUse}
          setModalIsOpen={setModalIsOpen}
        />
      </Modal>
    </div>
    </div>
  )
}

export default TicketTransactionTile