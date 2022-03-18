import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from '../UserContext'

const AuthenticationCheck = ({ component: Component, currentUser, setUser, setCurrentProfile }) => {
  if (currentUser === undefined) {
    return <div>Loading...</div>
  } 
  if (currentUser !== null) {
    return <Component currentUser={currentUser} setUser={setUser} setCurrentProfile={setCurrentProfile}/>;
  }
  return <Redirect to="/user-sessions/new" />;
};

const AuthenticatedRoute = ({ component, setUser, setCurrentProfile, ...rest }) => {
  const { currentUser } = useContext(UserContext)
  return (
    <Route
      {...rest}
    >
      <AuthenticationCheck currentUser={currentUser} setUser={setUser} setCurrentProfile={setCurrentProfile} component={component} />
    </Route>
  );
};

export default AuthenticatedRoute;
