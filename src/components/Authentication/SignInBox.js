/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

import SignInWith from "./SignInWith";
import { withFirebase } from "../../contexts/Firebase";
import { colors, mediaQuery } from "../../constants/styleTheme";

const titleStyles = (name, compareName) => css`
  background-color: ${name === compareName
    ? colors.tertiaryBackground
    : "white"};
  color: ${name === compareName ? "black" : "grey"};
  text-decoration: ${name === compareName ? "underline" : "none"};
  border: 1px solid ${colors.tertiaryBackground};
  flex: 1;
  margin: 0;
  border: 0;
  font-weight: bold;
  font-size: 2rem;
  ${mediaQuery} {
    padding: 1rem 0;
  }
`;

const SignInBox = ({ signInMethods, title, history }) => (
  <React.Fragment>
    <div
      css={css`
        display: flex;
        font-size: 1rem;
        justify-content: space-around;
        background-color: white;
      `}
    >
      <button
        css={titleStyles(title, "Sign In")}
        onClick={() => history.push("/signin")}
      >
        Sign In
      </button>
      <button
        css={titleStyles(title, "Register")}
        onClick={() => history.push("/register")}
      >
        Register
      </button>
    </div>
    {signInMethods.map((provider) => (
      <SignInWith key={provider} provider={provider} title={title} />
    ))}
  </React.Fragment>
);

export default compose(withRouter, withFirebase)(SignInBox);
