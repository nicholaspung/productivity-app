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

const Todo = ({ todo, firebase, handleMoveUp, handleMoveDown }) => {
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
    <>
      {edit && (
        <EditTodo handleEdit={handleEdit} todo={todo} firebase={firebase} />
      )}
      <Item
        data={todo}
        handleToggle={handleToggle}
        options={options}
        handleOptions={{
          closeOptions,
          toggleOptions,
          handleDelete,
          handleEdit,
          handleMoveUp,
          handleMoveDown
        }}
      />
    </>
  );
};

export default withFirebase(Todo);
