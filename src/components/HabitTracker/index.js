import React from "react";

import AddDaily from "./AddDaily";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

const HabitTracker = ({ authUser }) => {
  return (
    <>
      <div>Habit Tracker</div>
      <AddDaily id={authUser.uid} />
      <AddTodo id={authUser.uid} />
      <TodoList id={authUser.uid}/>
    </>
  );
};

export default HabitTracker;

// Add Dailies
// Show Dailies

// Add Todos
// Show Todos
