/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import SignInBox from "./SignInBox";
import { containers, colors, mediaQuery } from "../../constants/styleTheme";

const signInMethods = ["google", "facebook"];

const SignInPage = ({ title }) => (
  <div
    css={css`
      display: flex;
      justify-content: center;
      flex-flow: row wrap;
      text-align: center;
      margin: auto;
      padding-bottom: ${containers.spacing};
      width: 100%;
      ${mediaQuery} {
        width: ${containers.secondary};
      }
    `}
  >
    <div
      css={css`
        flex: 1;
        border: 1px solid ${colors.secondaryBackground};
        background-color: ${colors.tertiaryBackground};
        ${mediaQuery} {
          flex: 0 0 35%;
        }
      `}
    >
      <SignInBox title={title} signInMethods={signInMethods} />
    </div>
  </div>
);

export default SignInPage;
