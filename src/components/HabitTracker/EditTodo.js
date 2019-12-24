import React, { useEffect } from "react";
import useTextInput from "../../hooks/useTextInput";

const EditTodo = ({ handleEdit, todo, firebase }) => {
  // eslint-disable-next-line no-unused-vars
  const [name, _n, handleNameChange] = useTextInput(todo.name);
  // eslint-disable-next-line no-unused-vars
  const [description, _d, handleDescriptionChange] = useTextInput(
    todo.description
  );

  useEffect(() => {
    const handleModal = event => {
      if (event.target.className === "todo-modal") {
        handleEdit();
      }
    };

    window.addEventListener("click", handleModal);

    return () => window.removeEventListener("click", handleModal);
  });

  const handleUpdate = () => {
    firebase.todo(todo.id).update({ name: name, description: description });
    handleEdit();
  };

  return (
    <form
      className="todo-modal"
      style={{ border: "1px solid blue" }}
      onSubmit={handleUpdate}
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
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleEdit}>x</button>
    </form>
  );
};

export default EditTodo;
