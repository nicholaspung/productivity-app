/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

const Button = ({ onClickAction, styles, label }) => (
  <button
    onClick={onClickAction}
    css={css`
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      font-weight: bold;
      box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
      cursor: pointer;
      width: ${styles.width};
      font-size: 1.25rem;
      background-color: ${styles.backgroundColor};
      padding: ${styles.paddingRem}rem;
      @media only screen and (min-width: 700px) {
        font-size: 1.5rem;
        padding: ${styles.mediaPaddingRem}rem;
      }

      &:hover {
        box-shadow: 0 0 6px #4285f4;
      }
    `}
  >
    {label}
  </button>
);

export default Button;
