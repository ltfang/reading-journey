import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCalendarDays, faBookCopy, faTicket } from '@fortawesome/free-solid-svg-icons'

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button menu-btn">
        Sign Up
      </Link>
    </li>
  ];

  const authenticatedListItems = [
    <li key="calendar">
      <Link to="/log" className="button menu-btn">
        Reading Log
      </Link>
    </li>,
    <li key="tickets">
      <Link to="/tickets" className="button menu-btn">
        Tickets
      </Link>
    </li>,
    <li key="bookshelf">
      <Link to="/bookshelf" className="button menu-btn">
        Bookshelf
      </Link>
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>
  ];

  return (
    <div className="top-bar app-topbar">
      <div className="top-bar-left app-topbar">
        <ul className="menu">
          <li className="menu-text app-menutext">ReadingJourney</li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
