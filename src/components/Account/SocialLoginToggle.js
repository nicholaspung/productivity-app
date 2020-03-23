/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import GoogleLogo from "../../constants/assets/images/google-logo.png";

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
          background-color: white;
          color: grey;
        `
      : css`
          background-color: #1877f2;
          color: white;
        `;

  const logoIcon = method => {
    if (method === "google.com") {
      return (
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
    }
    if (method === "facebook.com") {
      return (
        <FontAwesomeIcon
          icon={faFacebook}
          css={css`
            padding: 0.5rem;
            margin-right: 1rem;
            font-size: 30px;
          `}
        />
      );
    }
  };
  return isEnabled ? (
    <button
      type="button"
      disabled={onlyOneLeft}
      css={css`
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        ${backgroundColor}
        font-weight: bold;
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
        cursor: not-allowed;
        width: 100%;
        font-size: 1.25rem;
        @media only screen and (min-width: 700px) {
          width: 500px;
          font-size: 1.5rem;
          padding: 1rem;
        }

        &:hover {
          box-shadow: 0 0 6px #4285f4;
        }
      `}
    >
      {logoIcon(signInMethod.id)}
      Deactivate {signInMethod.id}
    </button>
  ) : (
    <button
      type="button"
      onClick={() => onLink(signInMethod.provider)}
      css={css`
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        ${backgroundColor}
        font-weight: bold;
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
        cursor: pointer;
        width: 100%;
        font-size: 1.25rem;
        @media only screen and (min-width: 700px) {
          width: 500px;
          font-size: 1.5rem;
          padding: 1rem;
        }

        &:hover {
          box-shadow: 0 0 6px #4285f4;
        }
      `}
    >
      {logoIcon(signInMethod.id)}
      Link {signInMethod.id}
    </button>
  );
};

export default SocialLoginToggle;
