import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { ProfileContext } from '../ProfileContext'

const AuthenticationCheck = ({ component: Component, user, setUser, setCurrentProfile }) => {
  if (user === undefined) {
    return <div>Loading...</div>
  } 
  if (user !== null) {
    return <Component user={user} setUser={setUser} setCurrentProfile={setCurrentProfile}/>;
  }
  return <Redirect to="/user-sessions/new" />;
};

const AuthenticatedRoute = ({ component, setUser, setCurrentProfile, ...rest }) => {
  const { currentUser } = useContext(ProfileContext)
  const user = currentUser
  return (
    <Route
      {...rest}
    >
      <AuthenticationCheck user={user} setUser={setUser} setCurrentProfile={setCurrentProfile} component={component} />
    </Route>
  );
};

export default AuthenticatedRoute;
