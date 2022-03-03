import React from "react";
import { Redirect, Route } from "react-router";

const AuthenticationCheck = ({ component: Component, user, setUser, profile, setProfile }) => {
  if (user === undefined) {
    return <div>Loading...</div>
  } 
  if (user !== null) {
    return <Component user={user} setUser={setUser} profile={profile} setProfile={setProfile}/>;
  }
  return <Redirect to="/user-sessions/new" />;
};

const AuthenticatedRoute = ({ component, user, setUser, profile, setProfile, ...rest }) => {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <AuthenticationCheck user={user} setUser={setUser} profile={profile} setProfile={setProfile} component={component} />
    </Route>
  );
};

export default AuthenticatedRoute;
