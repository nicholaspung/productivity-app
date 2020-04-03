/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import GoogleLogo from "../../constants/assets/images/google-logo.png";
import Button from "../Reusable/Button";

const activateStyles = css`
  width: 170px;
  @media only screen and (min-width: 700px) {
    width: auto;
  }
`;

const GoogleImage = () => (
  <img
    src={GoogleLogo}
    alt="Google Logo"
    height="25"
    width="25"
    css={css`
      padding: 0.5rem;
      margin-right: 1rem;
    `}
  />
);

const FacebookImage = () => (
  <FontAwesomeIcon
    icon={faFacebook}
    css={css`
      padding: 0.5rem;
      margin-right: 1rem;
      font-size: 30px;
    `}
  />
);

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink
}) => {
  const backgroundColor =
    signInMethod.id === "google.com"
      ? css`
          color: grey;
        `
      : css`
          background-color: #1877f2;
          color: white;
        `;

  const logoIcon = method => {
    if (method === "google.com") {
      return GoogleImage();
    }
    if (method === "facebook.com") {
      return FacebookImage();
    }
  };
  return isEnabled ? (
    <Button
      onClickAction={() => onUnlink(signInMethod.provider)}
      disabled={onlyOneLeft}
      styles={css`
        ${backgroundColor}
        cursor: not-allowed;
        width: 100%;
        @media only screen and (min-width: 700px) {
          width: 500px;
          padding: 1rem;
        }
      `}
    >
      {logoIcon(signInMethod.id)}
      <span css={activateStyles}>
        {onlyOneLeft ? "Cannot deactivate" : "Deactivate"} {signInMethod.id}
      </span>
    </Button>
  ) : (
    <Button
      onClickAction={() => onLink(signInMethod.provider)}
      styles={css`
        ${backgroundColor}
        width: 100%;
        @media only screen and (min-width: 700px) {
          width: 500px;
          padding: 1rem;
        }
      `}
    >
      {logoIcon(signInMethod.id)}
      <span css={activateStyles}>Link {signInMethod.id}</span>
    </Button>
  );
};

export default SocialLoginToggle;
