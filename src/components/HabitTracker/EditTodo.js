import React, { useEffect } from "react";
import useTextInput from "../../hooks/useTextInput";

const EditTodo = ({ handleEdit, todo }) => {
  const [name, setName, handleNameChange] = useTextInput(todo.name);
  const [description, setDescription, handleDescriptionChange] = useTextInput(
    todo.description
  );

  useEffect(() => {
    const handleModal = event => {
      if (event.target.className == "todo-modal") {
        handleEdit();
      }
    };

    window.addEventListener("click", handleModal);

    return () => window.removeEventListener("click", handleModal);
  });

  return (
    <div className="todo-modal" style={{ border: "1px solid blue" }}>
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
      <button onClick={handleEdit}>x</button>
    </div>
  );
};

export default EditTodo;
