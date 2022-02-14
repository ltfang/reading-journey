import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = ({ user }) => {
  const unauthenticatedWelcome = 
    <div className="app-callout">
      <p className="unauth-text">
        Start your reading adventure by tracking how much you read each day.  Earn tickets every time you read!
      </p>
      <div className="app-btn sign-up-btn">
        <Link to="/users/new" className="link">Sign up to get started!</Link>
      </div>
      <div className="existing-user-sign-in">
        Existing user? 
        <Link to="/user-sessions/new"> Sign in </Link>
      </div>
    </div>

  const name = user?.name 
  const authenticatedWelcome = 
    <div className="app-callout">
      <h2 className="greeting">{`Hi ${name}!`}</h2>
      <ul className="greeting-ul">
        <li className="homepage-list">Log how much you read today</li>
        <li className="homepage-list">Check out your bookshelf</li>
        <li className="homepage-list">Use your tickets</li>
      </ul>
    </div>

  return (
    <div>
      <h1 className="header">Welcome to your Reading Journey!</h1>
      <div>{user ? authenticatedWelcome : unauthenticatedWelcome}</div>
    </div>
  )
}

export default HomePage