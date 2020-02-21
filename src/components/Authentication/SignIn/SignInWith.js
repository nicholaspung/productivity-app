/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import GoogleLogo from "../../../constants/assets/images/google-logo.png";
import { withFirebase } from "../../../contexts/Firebase";
import * as ROUTES from "../../../constants/routes";
import * as ROLES from "../../../constants/roles";

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

const SignInWithBase = ({ firebase, history, provider, title }) => {
  const [error, setError] = useState(null);
  const { signInMethod, name } = chooseProvider(firebase, provider);

  const onSubmit = event => {
    signInMethod()
      .then(socialAuthUser => {
        const authUserObject = {
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: { [ROLES.USER]: true }
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
    <form
      onSubmit={onSubmit}
      css={css`
        margin: 1rem;
      `}
    >
      <button
        type="submit"
        css={css`
          display: flex;
          align-items: center;
          padding: 1rem;
          background-color: white;
          border: 0;
          font-size: 1.5rem;
          color: grey;
          font-weight: bold;
          box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
          cursor: pointer;

          &:hover {
            box-shadow: 0 0 6px #4285f4;
          }
        `}
      >
        <img
          src={GoogleLogo}
          alt="Google Logo"
          height="25"
          width="25"
          css={css`
            padding: 0.5rem;
            margin-right: 1rem;
          `}
        />
        {title} with {name}
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default compose(withRouter, withFirebase)(SignInWithBase);
