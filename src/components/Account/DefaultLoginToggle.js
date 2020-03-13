import React, { useState } from "react";

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
      Click to deactivate {signInMethod.id}
    </button>
  ) : (
    <form onSubmit={onSubmit}>
      <input
        name="passwordOne"
        value={password.passwordOne}
        onChange={onChange}
        type="password"
        placeholder="New Password"
        autoComplete="new-password"
      />
      <input
        name="passwordTwo"
        value={password.passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm New Password"
        autoComplete="new-password"
      />
      <button disabled={isInvalid} type="submit">
        Link {signInMethod.id}
      </button>
    </form>
  );
};

export default DefaultLoginToggle;
