/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import AuthSignIn from "./AuthSignIn";

const signInMethods = ["google"];
// "facebook", "twitter", "github"

const SignInPage = () => (
  <div
    css={css`
      display: flex;
      justify-content: center;
      flex-flow: row wrap;
      text-align: center;
    `}
  >
    <div>
      <AuthSignIn title="Sign In" signInMethods={signInMethods} />
    </div>
    <div>
      <AuthSignIn title="Sign Up" signInMethods={signInMethods} />
    </div>
  </div>
);

export default SignInPage;
