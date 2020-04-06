/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import { colors } from "../../constants/styleTheme";
import { withFirebase } from "../../contexts/Firebase";

const SignOutButton = ({ firebase }) => (
  <button
    type="button"
    onClick={firebase.doSignOut}
    css={css`
      background-color: ${colors.secondary};
      border: 0;
      padding: 0.25rem 1rem;
      font-weight: bold;
      cursor: pointer;
    `}
  >
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
