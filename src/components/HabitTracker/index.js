/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React, { useState, useEffect } from "react";

import AddHabit from "./AddHabit";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import HabitList from "./HabitList";
import HabitHeader from "./HabitHeader";
import TodoHeader from "./TodoHeader";
import PreviousDay from "./PreviousDay";
import { getTodaysDate } from "../../utilities";
import { colors } from "../../constants/styleTheme";

const HabitTracker = ({ authUser }) => {
  const [showPreviousDay, setShowPreviousDay] = useState(false);

  useEffect(() => {
    let today = getTodaysDate(new Date());
    let isFirstTime = JSON.parse(localStorage.getItem("first-time-for-day"));
    if (today !== isFirstTime) {
      setShowPreviousDay(true);
    }
  }, []);

  return (
    <>
      {/* {showPreviousDay && (
        <PreviousDay
          uid={authUser.uid}
          setShowPreviousDay={setShowPreviousDay}
        />
      )} */}
      <div
        css={css`
          margin: 0 0.75rem 1.5rem;
          flex: 1 0 25%;
          min-width: 350px;
        `}
      >
        <HabitHeader />
        <div
          css={css`
            border: 0.5rem solid ${colors.primaryBackground};
            background-color: lightgrey;
          `}
        >
          <AddHabit />
          <HabitList uid={authUser.uid} date={getTodaysDate(new Date())} />
          <div
            css={css`
              text-align: center;
              font-weight: normal;
            `}
          >
            <p>These are your Dailies</p>
            <p>Dailies repeat on a regular basis.</p>
            <p>These need to be completed once per day.</p>
          </div>
        </div>
      </div>
      <div
        css={css`
          margin: 0 0.75rem 1.5rem;
          flex: 1 0 25%;
          min-width: 350px;
        `}
      >
        <TodoHeader />
        <div
          css={css`
            border: 0.5rem solid ${colors.primaryBackground};
            background-color: lightgrey;
          `}
        >
          <AddTodo />
          <TodoList uid={authUser.uid} done={false} />
          <div
            css={css`
              text-align: center;
              font-weight: normal;
            `}
          >
            <p>These are your todos.</p>
            <p>Todo need to be completed.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HabitTracker;
