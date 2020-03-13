/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";
import { compose } from "recompose";

import {
  withAuthorization,
  AuthUserContext,
  withEmailVerification
} from "../../contexts/Session";
import LoginManagement from "./LoginManagement";
import { containers } from "../../constants/styleTheme";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div
        css={css`
          text-align: center;
          width: ${containers.secondary};
          margin: auto;
          padding-bottom: ${containers.spacing};
        `}
      >
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
