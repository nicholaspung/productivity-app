import React, { useState, useEffect } from "react";

import AddHabit from "./AddHabit";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import HabitList from "./HabitList";
import PreviousDay from "./PreviousDay";
import { getTodaysDate } from "../../utilities";

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
      {showPreviousDay && (
        <PreviousDay
          uid={authUser.uid}
          setShowPreviousDay={setShowPreviousDay}
        />
      )}
      <div>Habit Tracker</div>
      <AddHabit />
      <p>Habit List</p>
      <HabitList uid={authUser.uid} date={getTodaysDate(new Date())} />
      <AddTodo />
      <p>Todo List</p>
      <TodoList uid={authUser.uid} done={false} />
      <p>Archive</p>
      <TodoList uid={authUser.uid} done={true} />
    </>
  );
};

export default HabitTracker;
