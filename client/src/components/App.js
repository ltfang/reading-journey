import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'

import getCurrentUser from '../services/getCurrentUser'
import '../assets/scss/main.scss'
import RegistrationForm from './registration/RegistrationForm'
import SignInForm from './authentication/SignInForm'
import TopBar from './layout/TopBar'
import HomePage from './layout/HomePage'
import Calendar from './layout/Calendar'
import ReadingSessions from './layout/ReadingSessions'
import TicketsPage from './layout/TicketsPage'
import Bookshelf from './layout/Bookshelf'
import AuthenticatedRoute from './authentication/AuthenticatedRoute'

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null)
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <HomePage user={currentUser} />
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/log" component={Calendar} user={currentUser} />
        <AuthenticatedRoute exact path="/log/:date" component={ReadingSessions} user={currentUser} />
        <AuthenticatedRoute exact path="/bookshelf" component={Bookshelf} user={currentUser} />
        <AuthenticatedRoute exact path="/tickets" component={TicketsPage} user={currentUser} />
      </Switch>
    </Router>
  );
};

export default hot(App);
