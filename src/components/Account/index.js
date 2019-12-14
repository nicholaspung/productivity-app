import React from "react";
import { compose } from "recompose";

import {
  withAuthorization,
  AuthUserContext,
  withEmailVerification
} from "../Session";
import LoginManagement from "./LoginManagement";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <LoginManagement authUser={authUser} />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
