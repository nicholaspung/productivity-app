/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

const Landing = () => (
  <div
    css={css`
      text-align: center;
    `}
  >
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
