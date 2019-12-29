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
    <div>
      <input
        type="checkbox"
        onChange={handleToggle}
        value={todo.done}
        checked={todo.done}
      />
      <span>{todo.name}</span>
      {!options ? (
        <button type="button" onClick={handleOptions}>
          Options
        </button>
      ) : (
        <>
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
        </>
      )}
      {edit && (
        <EditTodo handleEdit={handleEdit} todo={todo} firebase={firebase} />
      )}
      {todo.description && <p>{todo.description}</p>}
    </div>
  );
};

export default withFirebase(Todo);
