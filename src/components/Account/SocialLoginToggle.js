/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import { mediaQuery } from "../../constants/styleTheme";
import { GoogleButton, FacebookButton } from "../Reusable/Button";

const buttonTextStyles = css`
  width: 170px;
  ${mediaQuery} {
    width: auto;
  }
`;

const buttonContainerStyles = css`
  width: 100%;
  ${mediaQuery} {
    width: 500px;
    padding: 1rem;
  }
`;

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink,
}) => {
  const SocialButton =
    signInMethod.id === "google.com" ? GoogleButton : FacebookButton;
  return isEnabled ? (
    <SocialButton
      onClickAction={() => onUnlink(signInMethod.provider)}
      disabled={onlyOneLeft}
      styles={css`
        ${buttonContainerStyles}
        cursor: not-allowed;
      `}
    >
      <span css={buttonTextStyles}>
        {onlyOneLeft ? "Cannot deactivate" : "Deactivate"} {signInMethod.id}
      </span>
    </SocialButton>
  ) : (
    <SocialButton
      onClickAction={() => onLink(signInMethod.provider)}
      styles={css`
        ${buttonContainerStyles}
      `}
    >
      <span css={buttonTextStyles}>Link {signInMethod.id}</span>
    </SocialButton>
  );
};

export default SocialLoginToggle;
