import React, { useState } from "react";

import { withFirebase } from "../Firebase";

const INITIAL_STATE = {
  email: "",
  error: null
};

const PasswordForgetFormBase = ({ firebase }) => {
  const [userInfo, setUserInfo] = useState(INITIAL_STATE);

  const onSubmit = event => {
    const { email } = userInfo;
    firebase
      .doPasswordReset(email)
      .then(() => {
        setUserInfo({ ...INITIAL_STATE });
      })
      .catch(error => {
        setUserInfo({ ...INITIAL_STATE, error });
      });
    event.preventDefault();
  };

  const onChange = event => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const isInvalid = userInfo.email === "";
  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={userInfo.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {userInfo.error && <p>{userInfo.error.message}</p>}
    </form>
  );
};

export default withFirebase(PasswordForgetFormBase);
