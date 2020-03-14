/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { colors } from "../../constants/styleTheme";
import GoogleLogo from "../../constants/assets/images/google-logo.png";

const iconStyles = css`
  padding: 0 0.25rem;
`;

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink
}) => {
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
            filter: invert(1);
            color: #1877f2;
          `}
        />
      );
    }
  };
  return isEnabled ? (
    <button
      type="button"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
      css={css`
        margin: auto;
        display: flex;
        align-items: center;
        padding: 1rem;
        background-color: white;
        border: 0;
        font-size: 1.5rem;
        color: grey;
        font-weight: bold;
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
        cursor: pointer;

        &:hover {
          box-shadow: 0 0 6px #4285f4;
        }
      `}
    >
      {logoIcon(signInMethod.id)}
      Click to deactivate {signInMethod.id}
    </button>
  ) : (
    <button
      type="button"
      onClick={() => onLink(signInMethod.provider)}
      css={css`
        background-color: ${colors.secondary};
        font-color: black;
        border: 2px solid black;
        font-weight: bold;
        margin: 1rem;
        padding: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
      `}
    >
      {logoIcon(signInMethod.id)}
      Link {signInMethod.id}
    </button>
  );
};

export default SocialLoginToggle;
