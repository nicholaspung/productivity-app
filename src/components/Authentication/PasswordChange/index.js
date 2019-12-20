import React, { useState } from "react";

import { withFirebase } from "../../contexts/Firebase";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

const PasswordChangeForm = ({ firebase }) => {
  const [userInfo, setUserInfo] = useState(INITIAL_STATE);

  const onSubmit = event => {
    const { passwordOne } = userInfo;
    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setUserInfo({ ...INITIAL_STATE });
      })
      .catch(error => {
        setUserInfo({ ...userInfo, error });
      });
    event.preventDefault();
  };

  const onChange = event => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const isInvalid =
    userInfo.passwordOne !== userInfo.passwordTwo ||
    userInfo.passwordOne === "";
    
  return (
    <form onSubmit={onSubmit}>
      <input
        name="passwordOne"
        value={userInfo.passwordOne}
        onChange={onChange}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        value={userInfo.passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {userInfo.error && <p>{userInfo.error.message}</p>}
    </form>
  );
};

export default withFirebase(PasswordChangeForm);
