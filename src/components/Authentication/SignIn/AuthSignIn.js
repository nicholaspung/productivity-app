/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import SignInWith from "./SignInWith";
import { withFirebase } from "../../../contexts/Firebase";

const AuthSignIn = ({ signInMethods, title }) => (
  <>
    <h1>{title}</h1>
    {signInMethods.map(provider => (
      <SignInWith key={provider} provider={provider} title={title} />
    ))}
  </>
);

export default withFirebase(AuthSignIn);
