/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";
import { withFirebase } from "../../contexts/Firebase";
import HabitList from "./HabitList";
import { getYesterdaysDate, getTodaysDate } from "../../utilities";
import { colors } from "../../constants/styleTheme";

const PreviousDay = ({ uid, setShowPreviousDay, status }) => {
  const handleClick = () => {
    setShowPreviousDay(false);
    localStorage.setItem(
      "first-time-for-day",
      JSON.stringify(getTodaysDate(new Date()))
    );
  };

  return (
    <>
      <h1>Welcome back!</h1>
      <p>
        Check and see if you forgot to complete any habits from the previous
        day.
      </p>
      <HabitList
        uid={uid}
        date={getYesterdaysDate(new Date())}
        status={status}
        noEdit={true}
      />
      <button
        type="button"
        onClick={handleClick}
        css={css`
          background-color: ${colors.secondary};
          font-color: black;
          border: 2px solid black;
          font-weight: bold;
          margin: 1rem;
          padding: 1rem;
          font-size: 1.5rem;
          cursor: pointer;
        `}
      >
        Start my new day!
      </button>
    </>
  );
};

export default withFirebase(PreviousDay);
