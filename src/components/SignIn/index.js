import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignInGoogle />
    <SignInFacebook />
    <SignInTwitter />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

const SignInFormBase = ({ firebase, history }) => {
  const [userInfo, setUserInfo] = useState(INITIAL_STATE);

  const onSubmit = event => {
    const { email, password } = userInfo;
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setUserInfo({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        setUserInfo({ ...userInfo, error });
      });
    event.preventDefault();
  };

  const onChange = event => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const isInvalid = userInfo.password === "" || userInfo.email === "";

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={userInfo.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={userInfo.password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>
      {userInfo.error && <p>{userInfo.error.message}</p>}
    </form>
  );
};

const SignInGoogleBase = ({ firebase }) => {
  const [error, setError] = useState(null);

  const onSubmit = event => {
    firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        const authUserObject = {
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {}
        };

        return firebase.user(socialAuthUser.user.uid).set(authUserObject);
      })
      .then(() => {
        setError(null);
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setError(error);
      });
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Sign In with Google</button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignInFacebookBase = ({ firebase }) => {
  const [error, setError] = useState(null);

  const onSubmit = event => {
    firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        const authUserObject = {
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {}
        };

        return firebase.user(socialAuthUser.user.uid).set(authUserObject);
      })
      .then(() => {
        setError(null);
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setError(error);
      });
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Sign In with Google</button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignInTwitterBase = ({ firebase }) => {
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

        return firebase.user(socialAuthUser.user.uid).set(authUserObject);
      })
      .then(() => {
        setError(null);
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setError(error);
      });
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Sign In with Google</button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
const SignInGoogle = compose(withRouter, withFirebase)(SignInGoogleBase);
const SignInFacebook = compose(withRouter, withFirebase)(SignInFacebookBase);
const SignInTwitter = compose(withRouter, withFirebase)(SignInTwitterBase);

export default SignInPage;

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };
