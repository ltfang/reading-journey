import React from "react";
import { Redirect, Route } from "react-router";

const AuthenticationCheck = ({ component: Component, user, setUser, currentProfile, setCurrentProfile }) => {
  if (user === undefined) {
    return <div>Loading...</div>
  } 
  if (user !== null) {
    return <Component user={user} setUser={setUser} currentProfile={currentProfile} setCurrentProfile={setCurrentProfile}/>;
  }
  return <Redirect to="/user-sessions/new" />;
};

const AuthenticatedRoute = ({ component, user, setUser, currentProfile, setCurrentProfile, ...rest }) => {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <AuthenticationCheck user={user} setUser={setUser} currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} component={component} />
    </Route>
  );
};

export default AuthenticatedRoute;
