/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";
import { Link } from "react-router-dom";

import { colors } from "../../constants/styleTheme";
import { AuthUserContext } from "../../contexts/Session";
import * as ROUTES from "../../constants/routes";
import NavigationAuth from "./NavigationAuth";
import NavigationNonAuth from "./NavigationNonAuth";

const linkStyles = css`
  text-decoration: none;
  padding: 1rem;
  color: white;
`;

const Navigation = () => (
  <header
    css={css`
      background-color: ${colors.transition};
    `}
  >
    <div
      css={css`
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        background-color: ${colors.transition};
        padding: 1rem;
        margin: 0 auto 1.5rem;
        max-width: 1000px;
        color: white;
        font-size: 3rem;
        @media only screen and (min-width: 700px) {
          justify-content: space-between;
        }
      `}
    >
      <div
        css={css`
          text-align: center;
          @media only screen and (min-width: 700px) {
            flex: 1;
            text-align: left;
          }
        `}
      >
        <Link to={ROUTES.HOME} css={linkStyles}>
          Your Toolbox
        </Link>
      </div>
      <nav
        css={css`
          @media only screen and (min-width: 700px) {
            flex: 1;
          }
        `}
      >
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? (
              <NavigationAuth authUser={authUser} />
            ) : (
              <NavigationNonAuth />
            )
          }
        </AuthUserContext.Consumer>
      </nav>
    </div>
  </header>
);

export default Navigation;
