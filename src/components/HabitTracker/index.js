import React from "react";

import AddHabit from "./AddHabit";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import HabitList from "./HabitList";

const HabitTracker = ({ authUser }) => {
  return (
    <>
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

export default HabitTracker;

// Date
/*
  date: Date, (date.toString().slice(0,15))
  habits: [{
    name: String,
    description: String,
    done: Boolean,
    order: Number
  }]

  when you create a habit, you need to update the date object to see the added habit
  - have new habit
  - query date object, with habits
  - read the last habit order
  - add to new habit

  - add new habit to date object and update
  - add new habit to habits

  when you edit a habit, you need to update the date object with the updated habit
  - have updated habit
  - query the date object
  - find the habit and update in the date object
  
  - update date object with updated habit
  - update habit with updated habit

  when you click on finishing a habit, you need to update the date object as done
  - query date object
  - find the habit clicked and marked complete/uncomplete
  - update the date object


*/
