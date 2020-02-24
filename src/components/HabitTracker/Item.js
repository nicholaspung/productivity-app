/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import { colors } from "../../constants/styleTheme";

const Item = ({ data, handleToggle, options, handleOptions }) => (
  <div
    css={css`
      display: flex;
      margin: 0 0 0.3rem 0;
      background-color: lightgrey;
      border: 2px solid transparent;
      min-height: 79px;
      &:hover {
        border: 2px solid ${colors.transition};

        .item-option {
          opacity: 100;
        }
      }

      .item-checkmark {
        opacity: 100;
      }
    `}
  >
    <div
      css={css`
        height: auto;
        width: 50px;
        background-color: ${data.done
          ? colors.secondaryBackground
          : colors.primary};
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
            : colors.transition};
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
                : colors.primary};
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
        `}
        className="item-option"
        onClick={handleOptions}
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
              padding: 0.5rem;
              right: 0.3rem;
              top: -0.5rem;
              width: 150px;
            `}
          >
            <div>Edit</div>
            <div>To top</div>
            <div>To bottom</div>
            <div>Delete</div>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default Item;
