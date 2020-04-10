/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";
import { Link } from "react-router-dom";

import { mediaQuery } from "../../constants/styleTheme";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

import SignOutButton from "../Authentication/SignOut";

const linkStyles = css`
  font-size: 1rem;
  text-decoration: none;
  padding: 1rem;
  color: black;
`;

const NavigationAuth = ({ authUser }) => (
  <ul
    css={css`
      display: flex;
      align-items: center;
      justify-content: center;
      list-style: none;
      margin: 0;
      padding: 0;
      flex-flow: row wrap;
      ${mediaQuery} {
        justify-content: flex-end;
      }
    `}
  >
    <li>
      <Link to={ROUTES.HOME} css={linkStyles}>
        Home
      </Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT} css={linkStyles}>
        Account
      </Link>
    </li>
    {!!authUser.roles[ROLES.ADMIN] && (
      <li>
        <Link to={ROUTES.ADMIN} css={linkStyles}>
          Admin
        </Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

export default NavigationAuth;
