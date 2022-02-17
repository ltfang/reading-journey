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
        <Route exact path="/log" component={Calendar} />
        <Route exact path="/log/:date" component={ReadingSessions} />
        <Route exact path="/tickets" component={TicketsPage} />
      </Switch>
    </Router>
  );
};

export default hot(App);
