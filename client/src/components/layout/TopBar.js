import React, { useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import SignOutButton from "../authentication/SignOutButton"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCalendar, faBookOpen, faTicketAlt, faMedal, faUser } from '@fortawesome/free-solid-svg-icons'
import ProfileDropdown from "./Profile/ProfileDropdown"
import { UserContext } from "../UserContext"

const TopBar = ({ setCurrentProfile }) => {
  const { currentUser } = useContext(UserContext)

  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" className="sign-in-link">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="app-btn">
        Sign Up
      </Link>
    </li>
  ];

  const history = useHistory()
  const handleHomeClick = () => {
    history.push('/')
  }

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

  const handleProfileClick = () => {
    history.push('/profiles')
  }

  const authenticatedListItems = [
    <li key="calendar" className="cal-container icon-container" onClick={handleCalendarClick}>
      <FontAwesomeIcon 
        icon={faCalendar}
        className="calendar-icon fa-2xl"
      />
    </li>,
    <li key="bookshelf" className="book-container icon-container" onClick={handleBookClick}>
    <FontAwesomeIcon 
      icon={faBookOpen}
      className="book-icon fa-2xl"
    />
  </li>,
    <li key="tickets" className="ticket-container icon-container" onClick={handleTicketClick}>
      <FontAwesomeIcon 
        icon={faTicketAlt}
        className="ticket-icon fa-2xl"
      />
    </li>,
    <li key="achievements" className="medal-container icon-container" onClick={handleAchievementsClick}>
      <FontAwesomeIcon 
        icon={faMedal}
        className="ticket-icon fa-2xl"
      />
    </li>,
    <li key="profiles" className="home-container icon-container" onClick={handleProfileClick}>
      <FontAwesomeIcon 
        icon={faUser}
        className="ticket-icon fa-2xl"
      />
    </li>,
    <ProfileDropdown
      key="profile-dropdown" 
      currentUser={currentUser} 
      setCurrentProfile={setCurrentProfile}
    />,
    <li key="sign-out" className="sign-out-container">
      <SignOutButton />
    </li>
  ];


  return (
    <div className="top-bar app-topbar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="app-text">Reading<span>Journey</span></li>
          <li className="home-container icon-container" onClick={handleHomeClick}>
            <FontAwesomeIcon 
              icon={faHome}
              className="home-icon fa-2xl"
            />
          </li>
        </ul>
      </div>
      <div className="top-bar-right nav-right">
        <ul className="menu">{currentUser ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
