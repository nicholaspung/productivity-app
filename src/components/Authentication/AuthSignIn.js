/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

import SignInWith from "./SignInWith";
import { withFirebase } from "../../contexts/Firebase";
import { colors } from "../../constants/styleTheme";

const AuthSignIn = ({ signInMethods, title, history }) => {
  return (
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
          css={css`
            background-color: ${title === "Sign In"
              ? colors.tertiaryBackground
              : "white"};
            color: ${title === "Sign In" ? "black" : "grey"};
            text-decoration: ${title === "Sign In" ? "underline" : "none"};
            flex: 1;
            margin: 0;
            font-size: 2rem;
            border: 1px solid ${colors.tertiaryBackground};
            font-weight: bold;
            @media only screen and (min-width: 700px) {
              padding: 1rem 0;
            }
          `}
          onClick={() => history.push("/signin")}
        >
          Sign In
        </button>
        <button
          css={css`
            background-color: ${title === "Register"
              ? colors.tertiaryBackground
              : "white"};
            color: ${title === "Register" ? "black" : "grey"};
            text-decoration: ${title === "Register" ? "underline" : "none"};
            border: 1px solid ${colors.tertiaryBackground};
            flex: 1;
            margin: 0;
            border: 0;
            font-weight: bold;
            font-size: 2rem;
            @media only screen and (min-width: 700px) {
              padding: 1rem 0;
            }
          `}
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
};

export default compose(withRouter, withFirebase)(AuthSignIn);
