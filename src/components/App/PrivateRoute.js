import React from "react";
import { connect } from "redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, firebase, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      firebase.onAuthUserListener(
        (authUser) => children,
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )
    }
  />
);

export default connect(({ firebase }) => ({ firebase }))(PrivateRoute);
