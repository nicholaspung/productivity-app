/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import AuthSignIn from "./AuthSignIn";
import { containers, colors } from "../../../constants/styleTheme";

const signInMethods = ["google"];
// "facebook", "twitter", "github"
const boxStyles = css`
  flex: 0 0 35%;
  border: 1px solid ${colors.secondaryBackground};
  background-color: ${colors.tertiaryBackground};
`;

const SignInPage = () => (
  <div
    css={css`
      display: flex;
      justify-content: center;
      flex-flow: row wrap;
      text-align: center;
      width: ${containers.secondary};
      margin: auto;
      padding-bottom: ${containers.spacing};
    `}
  >
    <div css={boxStyles}>
      <AuthSignIn title="Sign In" signInMethods={signInMethods} />
    </div>
    <hr />
    <div css={boxStyles}>
      <AuthSignIn title="Sign Up" signInMethods={signInMethods} />
    </div>
  </div>
);

export default SignInPage;
