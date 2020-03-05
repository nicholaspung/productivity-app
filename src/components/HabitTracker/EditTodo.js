import React from "react";
import useTextInput from "../../hooks/useTextInput";

import Modal from "../Reusable/Modal";

const EditTodo = ({ handleEdit, todo, firebase }) => {
  const [name, , handleNameChange] = useTextInput(todo.name);
  const [description, , handleDescriptionChange] = useTextInput(
    todo.description
  );

  const handleUpdate = async event => {
    event.preventDefault();
    await firebase
      .todo(todo.id)
      .update({ name: name, description: description });
    handleEdit();
  };

  return (
    <Modal>
      <form
        style={{ border: "1px solid blue" }}
        onSubmit={event => handleUpdate(event)}
      >
        <input
          type="text"
          value={name}
          placeholder="Name..."
          onChange={handleNameChange}
        />
        <input
          type="textarea"
          value={description}
          placeholder="Write a description"
          onChange={handleDescriptionChange}
        />
        <button onClick={event => handleUpdate(event)}>Update</button>
        <button onClick={handleEdit}>x</button>
      </form>
    </Modal>
  );
};

export default EditTodo;
