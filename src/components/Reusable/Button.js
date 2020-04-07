/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import { colors, mediaQuery } from "../../constants/styleTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

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
  padding: 2rem;
  ${mediaQuery} {
    font-size: 1.5rem;
    padding: 0.5rem;
  }

  &:hover {
    box-shadow: 0 0 6px #4285f4;
  }
`;

const Button = ({
  onClickAction,
  styles,
  children,
  disabled = false,
  type = "button",
}) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClickAction}
    css={css`
      background-color: ${!disabled ? "white" : colors.primaryBackground};
      font-size: ${!disabled ? "black" : "grey"};
      ${baseStyles}
      ${styles && styles}
    `}
  >
    {children}
  </button>
);

export default Button;

/* ----------------------------------------------------- */
const fontAwesomeStyles = css`
  padding: 0.5rem;
  margin-right: 1rem;
  font-size: 30px;
`;

export const GoogleButton = ({
  children,
  onClickAction,
  disabled,
  styles,
  type,
}) => (
  <Button
    type={type}
    onClickAction={onClickAction}
    disabled={disabled}
    styles={css`
      ${styles && styles}
      color: grey;
    `}
  >
    <FontAwesomeIcon icon={faGoogle} css={fontAwesomeStyles} />
    {children}
  </Button>
);

export const FacebookButton = ({
  children,
  onClickAction,
  disabled,
  styles,
  type,
}) => (
  <Button
    type={type}
    onClickAction={onClickAction}
    disabled={disabled}
    styles={css`
      ${styles && styles}
      background-color: #1877f2;
      color: white;
    `}
  >
    <FontAwesomeIcon icon={faFacebook} css={fontAwesomeStyles} />
    {children}
  </Button>
);
