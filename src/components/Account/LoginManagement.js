import React, { useState, useEffect } from "react";

import { withFirebase } from "../../contexts/Firebase";
import PasswordChangeForm from "../PasswordChange";
import DefaultLoginToggle from "./DefaultLoginToggle";
import SocialLoginToggle from "./SocialLoginToggle";

const SIGN_IN_METHODS = [
  { id: "password", provider: "null" },
  { id: "google.com", provider: "googleProvider" },
  { id: "facebook.com", provider: "facebookProvider" },
  { id: "twitter.com", provider: "twitterProvider" }
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

  const onDefaultLoginLink = password => {
    const credential = firebase.emailAuthProvider.credential(
      authUser.email,
      password
    );

    firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(fetchSignInMethods)
      .catch(error => setError(error));
  };

  return (
    <div>
      {activeSignInMethods.includes("password") && <PasswordChangeForm />}
      Sign In Methods:
      <ul>
        {SIGN_IN_METHODS.map(signInMethod => {
          const onlyOneLeft = activeSignInMethods.length === 1;
          const isEnabled = activeSignInMethods.includes(signInMethod.id);

          return (
            <li key={signInMethod.id}>
              {signInMethod.id === "password" ? (
                <DefaultLoginToggle
                  onlyOneLeft={onlyOneLeft}
                  isEnabled={isEnabled}
                  signInMethod={signInMethod}
                  onLink={onDefaultLoginLink}
                  onUnlink={onUnlink}
                />
              ) : (
                <SocialLoginToggle
                  onlyOneLeft={onlyOneLeft}
                  isEnabled={isEnabled}
                  signInMethod={signInMethod}
                  onLink={onSocialLoginLink}
                  onUnlink={onUnlink}
                />
              )}
            </li>
          );
        })}
      </ul>
      {error && error.message}
    </div>
  );
};

export default withFirebase(LoginManagementBase);
