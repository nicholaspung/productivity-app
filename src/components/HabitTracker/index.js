import React, { useState, useEffect } from "react";

import "./habit.css";
import "./add-habit.css";
import "./habit-list.css";
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
      <div className="tracker-info">Track Your Life</div>
      <div className="habit-tracker">
        <p>Habit Tracker</p>
        <AddHabit />
        <HabitList uid={authUser.uid} date={getTodaysDate(new Date())} />
      </div>
      <div className="todo-tracker">
        <p>Your Todos</p>
        <AddTodo />
        <TodoList uid={authUser.uid} done={false} />
        <p>Archive</p>
        <TodoList uid={authUser.uid} done={true} />
      </div>
    </>
  );
};

export default HabitTracker;
