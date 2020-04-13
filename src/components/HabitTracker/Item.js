/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import ItemOptions from "./ItemOptions";
import { colors, mediaQuery } from "../../constants/styleTheme";

const checkmarkDimensions = "25px";
const checkmarkContainerDimensions = "35px";
const darkerColor = ["red", "blue"];
const lighterColor = ["pink", "lightblue"];

const Item = ({ data, handleToggle, options, handleOptions, noEdit, type }) => {
  const outsideBorder = type
    ? colors.transition
    : data.priority === "high"
    ? lighterColor[0]
    : lighterColor[1];
  const outerSquareAndCheckmark = data.done
    ? colors.secondaryBackground
    : type
    ? colors.primary
    : data.priority === "high"
    ? darkerColor[0]
    : darkerColor[1];
  const innerSquare = data.done
    ? colors.primaryBackground
    : type
    ? colors.transition
    : data.priority === "high"
    ? lighterColor[0]
    : lighterColor[1];
  const optionsBackground = options
    ? type
      ? colors.primary
      : data.priority === "high"
      ? darkerColor[0]
      : darkerColor[1]
    : "white";
  return (
    <div
      css={css`
        display: flex;
        margin: 0 0 0.3rem 0;
        background-color: lightgrey;
        border: 2px solid transparent;
        min-height: 79px;
        .item-option {
          opacity: 100;
        }
        .item-checkmark {
          opacity: 100;
        }
        ${mediaQuery} {
          &:hover {
            border: 2px solid ${outsideBorder};
            .item-option {
              opacity: 100;
            }
          }
          .item-option {
            opacity: 0;
          }
        }
      `}
      onMouseLeave={handleOptions.closeOptions}
    >
      <div
        css={css`
          height: auto;
          width: 50px;
          background-color: ${outerSquareAndCheckmark};
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          css={css`
            height: ${checkmarkContainerDimensions};
            width: ${checkmarkContainerDimensions};
            background-color: ${innerSquare};
            cursor: pointer;
          `}
          onClick={handleToggle}
        >
          <div
            css={css`
              height: ${checkmarkContainerDimensions};
              width: ${checkmarkContainerDimensions};
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
                height: ${checkmarkDimensions};
                width: ${checkmarkDimensions};
                clip-path: polygon(
                  23% 52%,
                  9% 65%,
                  33% 91%,
                  91% 28%,
                  79% 19%,
                  38% 65%
                );
                background-color: ${outerSquareAndCheckmark};
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
          border-right: 1px solid white;
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
      {!noEdit && (
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
            border-left: 1px solid white;
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
              background-color: ${optionsBackground};
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
            <ItemOptions
              type={type}
              handleOptions={handleOptions}
              data={data}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Item;
