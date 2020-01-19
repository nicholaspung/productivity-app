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
  const [edit, setEdit] = useState(false);

  const handleToggle = () => {
    firebase.todo(todo.id).update({ done: !todo.done });
  };

  const handleDelete = () => {
    firebase.todo(todo.id).delete();
  };

  const handleOptions = () => {
    setOptions(!options);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <li className="habit-item">
      <input
        type="checkbox"
        onChange={handleToggle}
        value={todo.done}
        checked={todo.done}
      />
      <div className="habit-item-name-container">
        <p className="habit-item-name">{todo.name}</p>
        {todo.description && (
          <p className="habit-item-description">{todo.description}</p>
        )}
      </div>
      <div className="habit-button">
        {!options ? (
          <button
            type="button"
            onClick={handleOptions}
            className="habit-options-button"
          >
            Options
          </button>
        ) : (
          <div className="habit-options">
            <button
              type="button"
              onClick={() => {
                handleEdit();
                handleOptions();
              }}
            >
              Edit
            </button>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
            <button type="button" onClick={handleOptions}>
              Cancel
            </button>
          </div>
        )}
      </div>
      {edit && (
        <EditTodo handleEdit={handleEdit} todo={todo} firebase={firebase} />
      )}
    </li>
  );
};

export default withFirebase(Todo);
