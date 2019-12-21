import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../../../contexts/Firebase";
import * as ROUTES from "../../../constants/routes";

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
        autoComplete="email"
      />
      <input
        name="password"
        value={userInfo.password}
        onChange={onChange}
        type="password"
        placeholder="Password"
        autoComplete="current-password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>
      {userInfo.error && <p>{userInfo.error.message}</p>}
    </form>
  );
};

export default compose(withRouter, withFirebase)(SignInFormBase);
