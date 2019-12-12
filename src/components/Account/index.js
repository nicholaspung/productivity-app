import React, { useState, useEffect } from "react";

import { withAuthorization, AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import PasswordChangeForm from "../PasswordChange";

const SIGN_IN_METHODS = [
  { id: "password", provider: "null" },
  { id: "google.com", provider: "googleProvider" },
  { id: "facebook.com", provider: "facebookProvider" },
  { id: "twitter.com", provider: "twitterProvider" }
];

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
          console.log(isEnabled);

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

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink
}) => {
  return isEnabled ? (
    <button
      type="button"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
    >
      Deactivate {signInMethod.id}
    </button>
  ) : (
    <button type="button" onClick={() => onLink(signInMethod.provider)}>
      Link {signInMethod.id}
    </button>
  );
};

const DefaultLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink
}) => {
  const [password, setPassword] = useState({
    passwordOne: "",
    passwordTwo: ""
  });

  const onSubmit = event => {
    event.preventDefault();

    onLink(password.passwordOne);
    setPassword({ passwordOne: "", passwordTwo: "" });
  };

  const onChange = event => {
    setPassword({ ...password, [event.target.name]: event.target.value });
  };

  const isInvalid =
    password.passwordOne !== password.passwordTwo ||
    password.passwordOne === "";

  return isEnabled ? (
    <button
      type="button"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
    >
      Deactivate {signInMethod.id}
    </button>
  ) : (
    <form onSubmit={onSubmit}>
      <input
        name="passwordOne"
        value={password.passwordOne}
        onChange={onChange}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        value={password.passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Link {signInMethod.id}
      </button>
    </form>
  );
};

const LoginManagement = withFirebase(LoginManagementBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
