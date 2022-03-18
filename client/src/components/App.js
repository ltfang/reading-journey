import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'

import getCurrentUser from '../services/getCurrentUser'
import '../assets/scss/main.scss'
import RegistrationForm from './registration/RegistrationForm'
import SignInForm from './authentication/SignInForm'
import TopBar from './layout/TopBar'
import ProfilesPage from './layout/Profile/ProfilesPage'
import HomePage from './layout/HomePage'
import Calendar from './layout/ReadingLog/Calendar'
import ReadingSessions from './layout/ReadingLog/ReadingSessions'
import TicketsPage from './layout/Tickets/TicketsPage'
import Bookshelf from './layout/Bookshelf/Bookshelf'
import AuthenticatedRoute from './authentication/AuthenticatedRoute'
import AchievementsPage from './layout/Achievements/AchievementsPage'
import { UserContext } from './UserContext'

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)

  const [currentProfile, setCurrentProfile] = useState({
    id: "",
    name: ""
  })

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
      setCurrentProfile(user.currentProfile)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])
  
  return (
    <UserContext.Provider value={{ currentUser, currentProfile }}>
      <Router>
        <TopBar setCurrentProfile={setCurrentProfile} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/users/new" component={RegistrationForm} />
          <Route exact path="/user-sessions/new" component={SignInForm} />
          <AuthenticatedRoute exact path="/log" component={Calendar} />
          <AuthenticatedRoute exact path="/log/:date" component={ReadingSessions} />
          <AuthenticatedRoute exact path="/bookshelf" component={Bookshelf} />
          <AuthenticatedRoute exact path="/tickets" component={TicketsPage} />
          <AuthenticatedRoute exact path="/achievements" component={AchievementsPage} />
          <AuthenticatedRoute 
            exact path="/profiles" 
            component={ProfilesPage} 
            setUser={setCurrentUser}
            setCurrentProfile={setCurrentProfile}
          />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default hot(App);
