import React from "react";
import { Redirect, Route } from "react-router";

const AuthenticationCheck = ({ component: Component, user, profile }) => {
  if (user === undefined) {
    return <div>Loading...</div>
  } 
  if (user !== null) {
    return <Component user={user} profile={profile}/>;
  }
  return <Redirect to="/user-sessions/new" />;
};

const AuthenticatedRoute = ({ component, user, profile, ...rest }) => {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <AuthenticationCheck user={user} profile={profile} component={component} />
    </Route>
  );
};

export default AuthenticatedRoute;
