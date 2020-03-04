import React from "react";
import useTextInput from "../../hooks/useTextInput";
import useModal from "../../hooks/useModal";

const EditTodo = ({ handleEdit, todo, firebase }) => {
  // eslint-disable-next-line no-unused-vars
  const [name, _n, handleNameChange] = useTextInput(todo.name);
  // eslint-disable-next-line no-unused-vars
  const [description, _d, handleDescriptionChange] = useTextInput(
    todo.description
  );

  useModal("todo-modal", handleEdit);

  const handleUpdate = async event => {
    event.preventDefault();
    await firebase
      .todo(todo.id)
      .update({ name: name, description: description });
    handleEdit();
  };

  return (
    <form
      className="todo-modal"
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
  );
};

export default EditTodo;
