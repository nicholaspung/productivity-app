/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React, { useState } from "react";

import AuthSignIn from "./AuthSignIn";
import { containers, colors } from "../../constants/styleTheme";

const signInMethods = ["google", "facebook"];

const boxStyles = css`
  flex: 1;
  border: 1px solid ${colors.secondaryBackground};
  background-color: ${colors.tertiaryBackground};
  @media only screen and (min-width: 700px) {
    flex: 0 0 35%;
  }
`;

const SignInPage = ({ title }) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        flex-flow: row wrap;
        text-align: center;
        margin: auto;
        padding-bottom: ${containers.spacing};
        width: 100%;
        @media only screen and (min-width: 700px) {
          width: ${containers.secondary};
        }
      `}
    >
      <div css={boxStyles}>
        <AuthSignIn title={title} signInMethods={signInMethods} />
      </div>
    </div>
  );
};

export default SignInPage;
