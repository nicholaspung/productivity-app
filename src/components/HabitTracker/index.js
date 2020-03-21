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
import Modal from "../Reusable/Modal";
import { getTodaysDate } from "../../utilities";
import { colors } from "../../constants/styleTheme";

const tableStyles = css`
  margin: 0 0.75rem 1.5rem;
  flex: 1 0 25%;
  min-width: 340px;
`;

const tableOutlineStyles = css`
  border: 0.5rem solid ${colors.primaryBackground};
  background-color: lightgrey;
  min-height: 500px;
`;

const textTableStyles = css`
  text-align: center;
  font-weight: normal;
`;

const HabitTracker = ({ authUser }) => {
  const [showPreviousDay, setShowPreviousDay] = useState(false);
  const [habitStatus, setHabitStatus] = useState("all");
  const [todoStatus, setTodoStatus] = useState("active");

  useEffect(() => {
    let today = getTodaysDate(new Date());
    let isFirstTime = JSON.parse(localStorage.getItem("first-time-for-day"));
    if (today !== isFirstTime) {
      setShowPreviousDay(true);
    }
  }, []);

  return (
    <>
      {showPreviousDay && (
        <Modal>
          <PreviousDay
            uid={authUser.uid}
            setShowPreviousDay={setShowPreviousDay}
            status={"all"}
          />
        </Modal>
      )}
      <div css={tableStyles}>
        <HabitHeader status={habitStatus} setStatus={setHabitStatus} />
        <div css={tableOutlineStyles}>
          <AddHabit date={getTodaysDate(new Date())} />
          <HabitList
            uid={authUser.uid}
            date={getTodaysDate(new Date())}
            status={habitStatus}
            noEdit={false}
          />
          <div css={textTableStyles}>
            <p>These are your Dailies</p>
            <p>Dailies repeat on a regular basis.</p>
            <p>These need to be completed once per day.</p>
          </div>
        </div>
      </div>
      <div css={tableStyles}>
        <TodoHeader status={todoStatus} setStatus={setTodoStatus} />
        <div css={tableOutlineStyles}>
          <AddTodo />
          <TodoList uid={authUser.uid} done={false} status={todoStatus} />
          <div css={textTableStyles}>
            <p>These are your todos.</p>
            <p>Todo need to be completed.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HabitTracker;
