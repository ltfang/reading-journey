import React from 'react'

const BookSort = ({ setSortCriterion }) => {

  const handleInputChange = (event) => {
    setSortCriterion(event.currentTarget.value)
  }

  return (
    <form>
      <div className="book-sort-bar">
        <select onChange={handleInputChange}>
          <option value={null}>
            Sort By
          </option>
          <option value="title">
            Title
          </option>
          <option value="author">
            Author
          </option>
          <option value="lastTimeRead">
            Last Date Read
          </option>
        </select>
      </div>
    </form>
  )
}

export default BookSort