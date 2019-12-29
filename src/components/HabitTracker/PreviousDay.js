import React from "react";
import { withFirebase } from "../../contexts/Firebase";
import HabitList from "./HabitList";
import { getYesterdaysDate, getTodaysDate } from "../../utilities";

const PreviousDay = ({ uid, setShowPreviousDay }) => {
  const handleClick = () => {
    setShowPreviousDay(false);
    localStorage.setItem(
      "first-time-for-day",
      JSON.stringify(getTodaysDate(new Date()))
    );
  };

  return (
    <>
      <HabitList uid={uid} date={getYesterdaysDate(new Date())} />
      <button type="button" onClick={handleClick}>
        Done!
      </button>
    </>
  );
};

export default withFirebase(PreviousDay);
