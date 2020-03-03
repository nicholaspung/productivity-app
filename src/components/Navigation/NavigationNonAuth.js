/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

const linkStyles = css`
  font-size: 1rem;
  text-decoration: none;
  padding: 1rem;
  color: black;
`;

const NavigationNonAuth = () => (
  <ul
    css={css`
      display: flex;
      align-items: center;
      list-style: none;
      margin: 0;
    `}
  >
    <li>
      <Link to={ROUTES.SIGN_IN} css={linkStyles}>
        Sign In
      </Link>
    </li>
  </ul>
);

export default NavigationNonAuth;
