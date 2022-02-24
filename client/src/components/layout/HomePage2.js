import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import ProfileIcon from './ProfileIcon'

const HomePage2 = ({ user }) => {

  const history = useHistory()

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
  const profileIcons = user?.profiles.map(profile => {
    return (
      <ProfileIcon
        key={profile.id}
        id={profile.id}
        name={profile.name}
      />
    )
  })

  const authenticatedWelcome = 
    <div>
      <h2 className="greeting">Hi {name}!</h2>
      <h2 className="greeting">Choose a profile:</h2>
      <ul className="profile-ul">
        {profileIcons}
      </ul>
    </div>

  return (
    <div className="homepage-callout">
      <h1 className="homepage-header">Welcome to ReadingJourney!</h1>
      <div>{user ? authenticatedWelcome : unauthenticatedWelcome}</div>
    </div>
  )
}

export default HomePage2