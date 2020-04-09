import React from "react";

import useTextInput from "../../hooks/useTextInput";
import EditTodoBase from "./EditTodoBase";

const EditTodo = ({ handleEdit, todo, firebase }) => {
  const [name, , handleNameChange] = useTextInput(todo.name);
  const [description, , handleDescriptionChange] = useTextInput(
    todo.description
  );

  const handleUpdate = async (event) => {
    event.preventDefault();
    await firebase
      .todo(todo.id)
      .update({ name: name, description: description });
    handleEdit();
  };

  return (
    <EditTodoBase
      handleUpdate={handleUpdate}
      handleEdit={handleEdit}
      handleNameChange={handleNameChange}
      name={name}
      description={description}
      handleDescriptionChange={handleDescriptionChange}
      labelName="todo-name"
      labelDescription="todo-description"
    />
  );
};

export default EditTodo;
