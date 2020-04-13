/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faArrowUp,
  faArrowDown,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { colors } from "../../constants/styleTheme";

const iconStyles = css`
  padding: 0 0.25rem;
`;

const ItemOptions = ({ type, handleOptions, data }) => {
  const words =
    type === "habits"
      ? { first: "Move Up", second: "Move Down" }
      : { first: "Set High Priority", second: "Set Low Priority" };
  const editWidth = type === "habits" ? "140px" : "180px";
  return (
    <div
      css={css`
        position: relative;
        display: inline-block;
        top: -2.75rem;
        right: 0.5rem;
        padding: 0;
      `}
    >
      <div
        css={css`
          position: absolute;
          z-index: 1;
          display: flex;
          flex-flow: column wrap;
          background-color: white;
          border: 1px solid grey;
          right: 0.3rem;
          top: -0.5rem;
          width: ${editWidth};
          text-align: right;
          & p {
            padding: 0.5rem 1rem;
            margin: 0;
            cursor: pointer;

            &:hover {
              background-color: ${colors.transition};
            }
          }
        `}
      >
        <p
          onClick={() => {
            handleOptions.handleEdit();
            handleOptions.closeOptions();
          }}
        >
          Edit
          <FontAwesomeIcon icon={faEdit} css={iconStyles} />
        </p>
        {data.priority && data.priority === "high" ? null : (
          <p
            onClick={() =>
              handleOptions.handleMoveUp(data, handleOptions.toggleOptions)
            }
          >
            {words.first}
            <FontAwesomeIcon icon={faArrowUp} css={iconStyles} />
          </p>
        )}
        {data.priority && data.priority === "low" ? null : (
          <p
            onClick={() =>
              handleOptions.handleMoveDown(data, handleOptions.toggleOptions)
            }
          >
            {words.second}
            <FontAwesomeIcon icon={faArrowDown} css={iconStyles} />
          </p>
        )}
        <p onClick={handleOptions.handleDelete}>
          Delete
          <FontAwesomeIcon icon={faTrash} css={iconStyles} />
        </p>
      </div>
    </div>
  );
};

export default ItemOptions;
