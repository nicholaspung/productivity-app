import React from "react";

import useTextInput from "../../hooks/useTextInput";
import EditTodoBase from "./EditTodoBase";

const EditHabit = ({ handleEdit, habit, firebase }) => {
  const [name, , handleNameChange] = useTextInput(habit.name);
  const [description, , handleDescriptionChange] = useTextInput(
    habit.description
  );

  const handleUpdate = async (event) => {
    event.preventDefault();
    await firebase
      .habit(habit.id)
      .update({ name: name, description: description });
    await firebase.getHabitsAndUpdateDate();
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
      labelName="habit-name"
      labelDescription="habit-description"
    />
  );
};

export default EditHabit;
