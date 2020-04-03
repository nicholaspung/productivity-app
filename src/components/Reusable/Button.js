/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

const baseStyles = css`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  font-weight: bold;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  width: 150px;
  font-size: 1.25rem;
  background-color: white;
  padding: 2rem;
  @media only screen and (min-width: 700px) {
    font-size: 1.5rem;
    padding: 0.5rem;
  }

  &:hover {
    box-shadow: 0 0 6px #4285f4;
  }
`;

const Button = ({ onClickAction, styles, children, disabled = false }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClickAction}
    css={css`
      ${baseStyles}
      ${styles}
    `}
  >
    {children}
  </button>
);

export default Button;
