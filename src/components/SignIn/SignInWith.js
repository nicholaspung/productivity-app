import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";
const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to this social account already exists.
  Try to login from this account instead and associate your social accounts
  on your personal account page
`;

const chooseProvider = (firebase, provider) => {
  let signInMethod = function() {};
  let name = "";

  switch (provider) {
    case "facebook":
      signInMethod = firebase.doSignInWithFacebook;
      name = "Facebook";
      break;
    case "google":
      signInMethod = firebase.doSignInWithGoogle;
      name = "Google";
      break;
    case "twitter":
      signInMethod = firebase.doSignInWithTwitter;
      name = "Twitter";
      break;
    case "github":
      signInMethod = firebase.doSignInWithGithub;
      name = "Github";
      break;
    default:
      break;
  }

  return { signInMethod, name };
};

const SignInWithBase = ({ firebase, history, provider }) => {
  const [error, setError] = useState(null);
  const { signInMethod, name } = chooseProvider(firebase, provider);

  const onSubmit = event => {
    signInMethod()
      .then(socialAuthUser => {
        const authUserObject = {
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
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
      <button type="submit">Sign In with {name}</button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default compose(withRouter, withFirebase)(SignInWithBase);
