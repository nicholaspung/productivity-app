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
import { withFirebase } from "../../contexts/Firebase";
import LoginManagement from "./LoginManagement";
import { containers } from "../../constants/styleTheme";

const AccountPage = ({ firebase }) => (
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
        <h1
          css={css`
            font-size: 1.5rem;
            @media only screen and (min-width: 700px) {
              font-size: 2rem;
            }
          `}
        >
          Account email: {authUser.email}
        </h1>
        <LoginManagement authUser={authUser} />
        <button onClick={() => firebase.deleteUserAndUserData(authUser.uid)}>
          Delete Account
        </button>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
