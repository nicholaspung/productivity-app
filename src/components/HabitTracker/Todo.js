import React, { useState } from "react";
import { withFirebase } from "../../contexts/Firebase";
import EditTodo from "./EditTodo";

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
  const [options, setOptions] = useState(false);

  const handleToggle = () => {
    firebase.todo(todo.id).update({ done: !todo.done });
  };

  const handleDelete = () => {
    firebase.todo(todo.id).delete();
  };

  const handleOptions = () => {
    setOptions(!options);
  };

  return (
    <div>
      <input
        type="checkbox"
        value={todo.done}
        onChange={handleToggle}
        checked={todo.done}
      />
      <span>{todo.name}</span>
      {!options ? (
        <button type="button" onClick={handleOptions}>
          Options
        </button>
      ) : (
        <>
          <button type="button">Edit</button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" onClick={handleOptions}>
            Cancel
          </button>
        </>
      )}
      <EditTodo />
    </div>
  );
};

export default withFirebase(Todo);
