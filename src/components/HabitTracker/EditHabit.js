import React from "react";
import useTextInput from "../../hooks/useTextInput";
import useExitModal from "../../hooks/useExitModal";

const EditHabit = ({ handleEdit, habit, firebase }) => {
  // eslint-disable-next-line no-unused-vars
  const [name, _n, handleNameChange] = useTextInput(habit.name);
  // eslint-disable-next-line no-unused-vars
  const [description, _d, handleDescriptionChange] = useTextInput(
    habit.description
  );

  useExitModal("habit-modal", handleEdit);

  const handleUpdate = async event => {
    event.preventDefault();
    await firebase
      .habit(habit.id)
      .update({ name: name, description: description });
    await firebase.getHabitsAndUpdateDate();
    handleEdit();
  };

  return (
    <form
      className="habit-modal"
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
      <button onClick={event => handleUpdate(event)} type="submit">
        Update
      </button>
      <button onClick={handleEdit} type="button">
        x
      </button>
    </form>
  );
};

export default EditHabit;
