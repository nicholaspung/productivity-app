import React, { useState } from "react";

import { withFirebase } from "../../contexts/Firebase";
import Item from "./Item";
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

  const toggleOptions = () => {
    setOptions(!options);
  };

  const closeOptions = () => {
    setOptions(false);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <Item
      data={todo}
      handleToggle={handleToggle}
      options={options}
      handleOptions={{ closeOptions, toggleOptions }}
    />
  );
};

export default withFirebase(Todo);
