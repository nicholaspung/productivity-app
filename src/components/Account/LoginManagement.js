/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React, { useState, useEffect } from "react";

import { withFirebase } from "../../contexts/Firebase";
import SocialLoginToggle from "./SocialLoginToggle";
import { colors, containers } from "../../constants/styleTheme";

const SIGN_IN_METHODS = [
  { id: "google.com", provider: "googleProvider" },
  { id: "facebook.com", provider: "facebookProvider" }
];

const LoginManagementBase = ({ firebase, authUser }) => {
  const [activeSignInMethods, setActiveSignInMethods] = useState([]);
  const [error, setError] = useState(null);

  const fetchSignInMethods = () => {
    firebase.auth
      .fetchSignInMethodsForEmail(authUser.email)
      .then(activeSignInMethodsObject =>
        setActiveSignInMethods(activeSignInMethodsObject)
      )
      .catch(error => setError(error));
  };

  useEffect(() => {
    fetchSignInMethods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSocialLoginLink = provider => {
    firebase.auth.currentUser
      .linkWithPopup(firebase[provider])
      .then(fetchSignInMethods)
      .catch(error => setError(error));
  };

  const onUnlink = providerId => {
    firebase.auth.currentUser
      .unlink(providerId)
      .then(fetchSignInMethods)
      .catch(error => setError(error));
  };

  return (
    <div
      css={css`
        background-color: ${colors.primaryBackground};
        padding: ${containers.spacing};
      `}
    >
      <p
        css={css`
          font-size: 1rem;
          font-weight: normal;
          @media only screen and (min-width: 700px) {
            font-size: 2rem;
          }
        `}
      >
        <strong>Email:</strong> {authUser.email}
      </p>
      <h2>Sign In Methods:</h2>
      <ul
        css={css`
          list-style: none;
          padding: 0;
        `}
      >
        {SIGN_IN_METHODS.map(signInMethod => {
          const onlyOneLeft = activeSignInMethods.length === 1;
          const isEnabled = activeSignInMethods.includes(signInMethod.id);

          return (
            <li
              key={signInMethod.id}
              css={css`
                margin: 1rem 0;
              `}
            >
              <SocialLoginToggle
                onlyOneLeft={onlyOneLeft}
                isEnabled={isEnabled}
                signInMethod={signInMethod}
                onLink={onSocialLoginLink}
                onUnlink={onUnlink}
              />
            </li>
          );
        })}
        {error && error.message}
      </ul>
    </div>
  );
};

export default withFirebase(LoginManagementBase);
