import React from 'react'
import { Link, useHistory } from 'react-router-dom'

const HomePage = ({ user }) => {

  const history = useHistory()

  const handleTicketClick = () => {
    history.push('/tickets')
  }

  const handleBookClick = () => {
    history.push('/bookshelf')
  }
  
  const handleCalendarClick = () => {
    history.push('/log')
  }

  const handleAchievementsClick = () => {
    history.push('/achievements')
  }

  const unauthenticatedWelcome = 
    <div>
      <p className="unauth-text">
        Start your reading adventure by tracking how much you read each day.  Earn tickets every time you read!
      </p>
      <div className="sign-up-btn-container">
        <Link to="/users/new" className="app-btn">Sign up to get started!</Link>
      </div>
      <div className="existing-user-sign-in">
        Existing user? 
        <Link to="/user-sessions/new"> Sign in </Link>
      </div>
    </div>

  const name = user?.name 
  const authenticatedWelcome = 
    <div>
      <h2 className="greeting">{`Hi ${name}!`}</h2>
      <ul className="greeting-ul">
        <li 
          className="homepage-list box1"
          onClick={handleCalendarClick}
          >Log how much you read today</li>
        <li 
          className="homepage-list box2"
          onClick={handleBookClick}
        >Browse your bookshelf</li>
        <li className="homepage-list box3"
          onClick={handleTicketClick}
        >Use your tickets</li>
        <li className="homepage-list box4"
          onClick={handleAchievementsClick}
        >Track your achievements</li>
      </ul>
    </div>

  return (
    <div className="homepage-callout">
      <h1 className="homepage-header">Welcome to your Reading Journey!</h1>
      <div>{user ? authenticatedWelcome : unauthenticatedWelcome}</div>
    </div>
  )
}

export default HomePage