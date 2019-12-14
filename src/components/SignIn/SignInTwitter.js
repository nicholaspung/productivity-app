import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import {
  ERROR_CODE_ACCOUNT_EXISTS,
  ERROR_MSG_ACCOUNT_EXISTS
} from "./constants";

const SignInTwitterBase = ({ firebase, history }) => {
  const [error, setError] = useState(null);

  const onSubmit = event => {
    firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        const authUserObject = {
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {}
        };

        return firebase
          .user(socialAuthUser.user.uid)
          .set(authUserObject, { merge: true });
      })
      .then(() => {
        setError(null);
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        setError(error);
      });
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Sign In with Twitter</button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default compose(withRouter, withFirebase)(SignInTwitterBase);
