import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";
const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists. Try to login
  with this account instead. If you think the account is already used
  from one of the social logins, try to sign-in with one of them.
  Afterward, associate your accounts on your personal account page.
`;

const SignUpFormBase = ({ firebase, history }) => {
  const INITIAL_STATE = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    isAdmin: false,
    error: null
  };
  const [userInfo, setUserInfo] = useState(INITIAL_STATE);

  const onSubmit = event => {
    const { email, passwordOne, username, isAdmin } = userInfo;

    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return firebase.user(authUser.user.uid).set({ username, email, roles });
      })
      .then(() => {
        setUserInfo({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        setUserInfo({ ...userInfo, error });
      });
    event.preventDefault();
  };

  const onChange = event => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const onChangeCheckbox = event => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.checked });
  };

  const isInvalid =
    userInfo.passwordOne !== userInfo.passwordTwo ||
    userInfo.passwordOne === "" ||
    userInfo.email === "" ||
    userInfo.username === "";

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={userInfo.username}
        onChange={onChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={userInfo.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={userInfo.passwordOne}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={userInfo.passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />
      <label>
        Admin:
        <input
          name="isAdmin"
          type="checkbox"
          checked={userInfo.isAdmin}
          onChange={onChangeCheckbox}
        />
      </label>
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>
      {userInfo.error && <p>{userInfo.error.message}</p>}
    </form>
  );
};

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
