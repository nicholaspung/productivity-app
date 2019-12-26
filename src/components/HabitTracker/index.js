import React, { useState, useEffect } from "react";

import AddHabit from "./AddHabit";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import HabitList from "./HabitList";
import PreviousDay from "./PreviousDay";
import useModalContainer from "../../hooks/useModalContainer";
import { getTodaysDate, getYesterdaysDate } from "../../utilities";
import { withFirebase } from "../../contexts/Firebase";

const HabitTracker = ({ authUser, firebase }) => {
  const [showPreviousDay, setShowPreviousDay] = useState(false);

  useEffect(() => {
    let today = getTodaysDate(new Date());
    firebase
      .dates()
      .where("date", "==", today)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          let yesterday = getYesterdaysDate(new Date())
          console.log(yesterday)
          // firebase.dates().where("date", "==", )
        }
      });
  });
  return (
    <>
      <PreviousDay />
      <div>Habit Tracker</div>
      <AddHabit id={authUser.uid} />
      <p>Habit List</p>
      <HabitList id={authUser.uid} />
      <AddTodo id={authUser.uid} />
      <p>Todo List</p>
      <TodoList id={authUser.uid} done={false} />
      <p>Archive</p>
      <TodoList id={authUser.uid} done={true} />
    </>
  );
};

export default withFirebase(HabitTracker);

// Date
/*
  date: Date, (date.toString().slice(0,15))
  habits: [{
    name: String,
    description: String,
    done: Boolean,
    order: Number
  }]

  when you edit a habit, you need to update the date object with the updated habit
  - have updated habit
  - query the date object
  - find the habit and update in the date object
  
  - update date object with updated habit
  - update habit with updated habit

*/
