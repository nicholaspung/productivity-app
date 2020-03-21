/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faArrowUp,
  faArrowDown,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../constants/styleTheme";

const iconStyles = css`
  padding: 0 0.25rem;
`;

const Item = ({ data, handleToggle, options, handleOptions, noEdit, type }) => {
  const words =
    type === "habits"
      ? { first: "Move Up", second: "Move Down" }
      : { first: "Set High Priority", second: "Set Low Priority" };
  const editWidth = type === "habits" ? "140px" : "180px";
  return (
    <div
      css={css`
        display: flex;
        margin: 0 0 0.3rem 0;
        background-color: lightgrey;
        border: 2px solid transparent;
        min-height: 79px;
        &:hover {
          border: 2px solid
            ${type
              ? colors.transition
              : data.priority === "high"
              ? "pink"
              : "lightblue"};

          .item-option {
            opacity: 100;
          }
        }

        .item-checkmark {
          opacity: 100;
        }
      `}
      onMouseLeave={handleOptions.closeOptions}
    >
      <div
        css={css`
          height: auto;
          width: 50px;
          background-color: ${data.done
            ? colors.secondaryBackground
            : type
            ? colors.primary
            : data.priority === "high"
            ? "red"
            : "blue"};
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          css={css`
            height: 35px;
            width: 35px;
            background-color: ${data.done
              ? colors.primaryBackground
              : type
              ? colors.transition
              : data.priority === "high"
              ? "pink"
              : "lightblue"};
            cursor: pointer;
          `}
          onClick={handleToggle}
        >
          <div
            css={css`
              height: 35px;
              width: 35px;
              display: flex;
              justify-content: center;
              align-items: center;
              opacity: 0;
              &:hover {
                opacity: 100;
              }
            `}
            className={`${data.done ? "item-checkmark" : ""}`}
          >
            <div
              css={css`
                height: 25px;
                width: 25px;
                clip-path: polygon(
                  23% 52%,
                  9% 65%,
                  33% 91%,
                  91% 28%,
                  79% 19%,
                  38% 65%
                );
                background-color: ${data.done
                  ? colors.secondaryBackground
                  : type
                  ? colors.primary
                  : data.priority === "high"
                  ? "red"
                  : "blue"};
              `}
            />
          </div>
        </div>
      </div>
      <div
        css={css`
          flex: 1;
          padding: 0.5rem;
          background-color: white;
          font-weight: normal;
        `}
      >
        {data.name}
        <br />
        <span
          css={css`
            margin-top: 0.5rem;
            font-size: 0.75rem;
            display: inline-block;
            min-height: 2rem;
            font-family: "Pontano Sans", sans-serif;
          `}
        >
          {data.description}
        </span>
      </div>
      {!noEdit ? (
        <div
          css={css`
            height: auto;
            display: flex;
            flex-flow: column;
            justify-content: space-between;
            align-items: flex-end;
            padding: 0.5rem;
            background-color: white;
            flex: 0 0 7.5%;
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4 16"
            css={css`
              padding-top: 5px;
              height: 15px;
              width: 10px;
              opacity: 0;
              cursor: pointer;
              background-color: ${options ? colors.primary : "white"};
              border-radius: 1rem;
            `}
            className="item-option"
            onClick={handleOptions.toggleOptions}
          >
            <path
              fillRule="evenodd"
              d="M2 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
            />
          </svg>
          {options && (
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
                <p onClick={handleOptions.handleEdit}>
                  Edit
                  <FontAwesomeIcon icon={faEdit} css={iconStyles} />
                </p>
                {data.priority ? (
                  data.priority === "high" ? null : (
                    <p
                      onClick={() =>
                        handleOptions.handleMoveUp(
                          data,
                          handleOptions.toggleOptions
                        )
                      }
                    >
                      {words.first}
                      <FontAwesomeIcon icon={faArrowUp} css={iconStyles} />
                    </p>
                  )
                ) : (
                  <p
                    onClick={() =>
                      handleOptions.handleMoveUp(
                        data,
                        handleOptions.toggleOptions
                      )
                    }
                  >
                    {words.first}
                    <FontAwesomeIcon icon={faArrowUp} css={iconStyles} />
                  </p>
                )}
                {data.priority ? (
                  data.priority === "low" ? null : (
                    <p
                      onClick={() =>
                        handleOptions.handleMoveDown(
                          data,
                          handleOptions.toggleOptions
                        )
                      }
                    >
                      {words.second}
                      <FontAwesomeIcon icon={faArrowDown} css={iconStyles} />
                    </p>
                  )
                ) : (
                  <p
                    onClick={() =>
                      handleOptions.handleMoveDown(
                        data,
                        handleOptions.toggleOptions
                      )
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
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Item;
