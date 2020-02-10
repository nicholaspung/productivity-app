/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React, { useState } from "react";
import { withFirebase } from "../../contexts/Firebase";
import { colors } from "../../constants/styleTheme";
import EditHabit from "./EditHabit";

/*
 * Habit Schema
 * {
 *  createdAt: Date,
 *  description: String,
 *  name: String,
 *  user: uid,
 *  id: id
 * }
 */

const Habit = ({ habit, firebase, date }) => {
  const [options, setOptions] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleToggle = () => {
    console.log("hi");
    firebase.toggleHabit(habit, date);
    console.log("firing");
  };

  const handleDelete = async () => {
    await firebase.habit(habit.id).delete();
    await firebase.getHabitsAndUpdateDate();
  };

  const handleOptions = () => {
    setOptions(!options);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <div
      css={css`
        display: flex;
        margin: 0 0 0.3rem 0;
        background-color: lightgrey;
        border: 2px solid transparent;
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
          background-color: ${habit.done
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
            background-color: ${habit.done
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
            className={`${habit.done ? "item-checkmark" : ""}`}
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
                background-color: ${habit.done
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
          cursor: pointer;
        `}
      >
        {habit.name}
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
          {habit.description}
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
          cursor: pointer;
        `}
      >
        {" "}
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
        >
          <path
            fillRule="evenodd"
            d="M2 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
          />
        </svg>
        <div
          css={css`
            font-size: 0.75rem;
            color: grey;
          `}
        >
          {">> 1000"}
        </div>
      </div>
    </div>
  );
};

export default withFirebase(Habit);
