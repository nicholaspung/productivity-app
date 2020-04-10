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
  text-transform: capitalize;
`;

const conditionalStyles = (status, conditional) => {
  if (status === conditional) {
    return css`
      ${statusStyles}
      ${activeStatusStyles}
    `;
  }
  return statusStyles;
};

const TodoHeader = ({ status, setStatus, title, categories }) => (
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
        {title}
      </h2>
    </div>
    <div>
      {categories.map((category) => (
        <button
          css={conditionalStyles(status, category)}
          onClick={() => setStatus(category)}
        >
          {category}
        </button>
      ))}
    </div>
  </div>
);

export default TodoHeader;
