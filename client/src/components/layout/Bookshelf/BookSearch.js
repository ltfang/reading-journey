import React from 'react'

const BookSearch = ({
  searchText, setSearchText}) => {
  
  const handleInputChange = (event) => {
    setSearchText(event.currentTarget.value)
  }

  return (
    <form>
      <div className="book-search-bar">
          <label htmlFor="book-search">
            <input 
              id="book-search"
              type="text" 
              name="book-search" 
              placeholder="Search for a book ..."
              value={searchText}
              onChange={handleInputChange}
            >
            </input>
          </label>
        </div>
    </form>
  )
}

export default BookSearch