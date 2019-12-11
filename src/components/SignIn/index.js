import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
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

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
