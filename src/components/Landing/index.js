/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";
import { Helmet } from "react-helmet";

const Landing = () => (
  <div
    css={css`
      text-align: center;
    `}
  >
    <Helmet>
      <title>Your Toolbox</title>
      <meta name="description" content="Your Toolbox" />
    </Helmet>
    <p
      css={css`
        font-size: 3rem;
      `}
    >
      Keep yourself on track!
    </p>
    <p
      css={css`
        font-size: 2rem;
      `}
    >
      Write down the actions that will make you move forward in your life.
    </p>
  </div>
);

export default Landing;
