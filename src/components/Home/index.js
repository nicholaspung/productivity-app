/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";
import { compose } from "recompose";
import { Helmet } from "react-helmet";

import {
  withAuthorization,
  withEmailVerification,
  AuthUserContext
} from "../../contexts/Session";
import HabitTracker from "../HabitTracker";
import Calendar from "../Calendar";

const HomePage = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <main
          css={css`
            display: grid;
            grid-template-rows: 1fr auto;
            grid-template-columns: 1fr 1fr;
          `}
        >
          <Helmet>
            <title>Home Page - Your Toolbox</title>
            <meta name="description" content="Home Page - Your Toolbox" />
          </Helmet>
          <section
            css={css`
              grid-column: 1/3;
              grid-row: 2/3;
              margin: 0 0.75rem 1.5rem;
            `}
          >
            <Calendar authUser={authUser} />
          </section>

          <section
            css={css`
              display: flex;
              flex-flow: row wrap;
              grid-column: 1/3;
              grid-row: 3/4;
            `}
          >
            <HabitTracker authUser={authUser} />
          </section>
        </main>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
