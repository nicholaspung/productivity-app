/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { mediaQuery } from "../../constants/styleTheme";
import { GoogleButton, FacebookButton } from "../Reusable/Button";
import { withFirebase } from "../../contexts/Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";
const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to this social account already exists.
  Try to login from this account instead and associate your social accounts
  on your personal account page
`;

const chooseProvider = (firebase, provider) => {
  let signInMethod = function () {};
  let name = "";
  let ProviderComponent = {};

  switch (provider) {
    case "facebook":
      signInMethod = firebase.doSignInWithFacebook;
      name = "Facebook";
      ProviderComponent = FacebookButton;
      break;
    case "google":
      signInMethod = firebase.doSignInWithGoogle;
      name = "Google";
      ProviderComponent = GoogleButton;
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

  return { signInMethod, name, ProviderComponent };
};

const SignInWithBase = ({ firebase, history, provider, title }) => {
  const [error, setError] = useState(null);
  const { signInMethod, name, ProviderComponent } = chooseProvider(
    firebase,
    provider
  );

  const onSubmit = (event) => {
    signInMethod()
      .then((socialAuthUser) => {
        const authUserObject = {
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: { [ROLES.USER]: true },
        };

        return firebase
          .user(socialAuthUser.user.uid)
          .set(authUserObject, { merge: true });
      })
      .then(() => {
        setError(null);
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
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
      <ProviderComponent
        type="submit"
        styles={css`
          width: 100%;
          padding: 0;
          ${mediaQuery} {
            width: 500px;
            font-size: 1.5rem;
            padding: 1rem;
          }
        `}
      >
        {title} with {name}
      </ProviderComponent>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default compose(withRouter, withFirebase)(SignInWithBase);
