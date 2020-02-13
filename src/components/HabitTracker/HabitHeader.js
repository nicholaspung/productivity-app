/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import { colors } from "../../constants/styleTheme";

const activeStatusStyles = css`
  border-bottom: 0.1rem solid ${colors.primary};
`;

const statusStyles = css`
  background-color: white;
  border: 0;
  cursor: pointer;
  border-bottom: 0.1rem solid transparent;
  padding: 0.25rem 0.5rem;
`;

const conditionalStyles = (status, conditional) => {
  if (status === conditional) {
    return [statusStyles, activeStatusStyles];
  }
  return statusStyles;
};

const HabitHeader = ({ status, setStatus }) => (
  <div
    css={css`
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    `}
  >
    <div>
      <h2
        css={css`
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0;
          padding: 0;
        `}
      >
        Your Dailies
      </h2>
    </div>
    <div>
      <button
        css={conditionalStyles(status, "all")}
        onClick={() => setStatus("all")}
      >
        All
      </button>
      <button
        css={conditionalStyles(status, "due")}
        onClick={() => setStatus("due")}
      >
        Due
      </button>
      <button
        css={conditionalStyles(status, "not due")}
        onClick={() => setStatus("not due")}
      >
        Not Due
      </button>
    </div>
  </div>
);

export default HabitHeader;
