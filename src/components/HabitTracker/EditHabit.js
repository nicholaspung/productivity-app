import React from "react";
import useTextInput from "../../hooks/useTextInput";

import Modal from "../Reusable/Modal";

const EditHabit = ({ handleEdit, habit, firebase }) => {
  const [name, , handleNameChange] = useTextInput(habit.name);
  const [description, , handleDescriptionChange] = useTextInput(
    habit.description
  );

  const handleUpdate = async event => {
    event.preventDefault();
    await firebase
      .habit(habit.id)
      .update({ name: name, description: description });
    await firebase.getHabitsAndUpdateDate();
    handleEdit();
  };

  return (
    <Modal>
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
    </Modal>
  );
};

export default EditHabit;
