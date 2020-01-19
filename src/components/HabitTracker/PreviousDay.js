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
    <div className="previous-day-tracker">
      <p>Previous Day</p>
      <HabitList
        uid={uid}
        date={getYesterdaysDate(new Date())}
        handlePreviousClick={handleClick}
      />
      <button type="button" onClick={handleClick}>
        Start my new day!
      </button>
    </div>
  );
};

export default withFirebase(PreviousDay);
