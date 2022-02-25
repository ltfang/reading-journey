import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'

import getCurrentUser from '../services/getCurrentUser'
import '../assets/scss/main.scss'
import RegistrationForm from './registration/RegistrationForm'
import SignInForm from './authentication/SignInForm'
import TopBar from './layout/TopBar'
import HomePage2 from './layout/HomePage2'
import HomePage from './layout/HomePage'
import Calendar from './layout/ReadingLog/Calendar'
import ReadingSessions from './layout/ReadingLog/ReadingSessions'
import TicketsPage from './layout/Tickets/TicketsPage'
import Bookshelf from './layout/Bookshelf/Bookshelf'
import AuthenticatedRoute from './authentication/AuthenticatedRoute'
import AchievementsPage from './layout/Achievements/AchievementsPage'
import Fetch from '../services/Fetch'

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
    } catch(err) {
      setCurrentUser(null)
    }
  }

  const fetchCurrentProfile = async () => {
    const body = await Fetch.get('/api/v1/profiles')
    const currentProfile = {...body.currentProfile, label: body.currentProfile.name}
    setCurrentProfile(currentProfile)
  }

  useEffect(() => {
    fetchCurrentUser()
    fetchCurrentProfile()
  }, [])

  return (
    <Router>
      <TopBar 
        user={currentUser} 
        currentProfile={currentProfile}
        setCurrentProfile={setCurrentProfile}
      />
      <Switch>
        <Route exact path="/">
          <HomePage user={currentUser} profile={currentProfile}/>
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute 
          exact path="/log" 
          component={Calendar} 
          user={currentUser} 
          profile={currentProfile}
        />
        <AuthenticatedRoute 
          exact path="/log/:date" 
          component={ReadingSessions} 
          user={currentUser} 
          profile={currentProfile}
        />
        <AuthenticatedRoute 
          exact path="/bookshelf" 
          component={Bookshelf} 
          user={currentUser} 
          profile={currentProfile}
        />
        <AuthenticatedRoute 
          exact path="/tickets" 
          component={TicketsPage} 
          user={currentUser} 
          profile={currentProfile}
        />
        <AuthenticatedRoute 
          exact path="/achievements" 
          component={AchievementsPage} 
          user={currentUser} 
          profile={currentProfile}
        />
      </Switch>
    </Router>
  );
};

export default hot(App);
