import React from "react";
import { withFirebase } from "../../contexts/Firebase";
import HabitList from "./HabitList";
import { getYesterdaysDate, getTodaysDate } from "../../utilities";

const PreviousDay = ({ id, setShowPreviousDay }) => {
  const handleClick = () => {
    setShowPreviousDay(false);
    localStorage.setItem(
      "first-time-for-day",
      JSON.stringify(getTodaysDate(new Date()))
    );
  };

  return (
    <>
      <HabitList id={id} date={getYesterdaysDate(new Date())} />
      <button type="button" onClick={handleClick}>
        Done!
      </button>
    </>
  );
};

export default withFirebase(PreviousDay);
