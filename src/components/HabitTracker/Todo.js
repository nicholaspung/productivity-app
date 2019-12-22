import React from "react";
import { withFirebase } from "../../contexts/Firebase";

/*
 * Todo Schema
 * {
 *  createdAt: Date,
 *  description: String,
 *  done: Boolean,
 *  doneAt: Date,
 *  name: String,
 *  user: uid,
 *  id: id
 * }
 */

const Todo = ({ todo, firebase }) => {
  const handleClick = () => {
    firebase.todo(todo.id).update({ done: !todo.done });
  };

  return (
    <div>
      <input type="checkbox" value={todo.done} onChange={handleClick} />
      <span>{todo.name}</span>
      <button type="button">Options</button>
    </div>
  );
};

export default withFirebase(Todo);
