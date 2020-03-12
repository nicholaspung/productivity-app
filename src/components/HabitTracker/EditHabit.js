/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import useTextInput from "../../hooks/useTextInput";
import Modal from "../Reusable/Modal";
import { colors } from "../../constants/styleTheme";

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
        onSubmit={event => handleUpdate(event)}
        css={css`
          display: flex;
          flex-flow: column wrap;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
          `}
        >
          <button
            onClick={event => handleUpdate(event)}
            type="submit"
            css={css`
              background-color: ${colors.primary};
              font-color: black;
              border: 2px solid black;
              font-weight: bold;
              cursor: pointer;
              color: white;
              margin: 0 0.25rem;
              font-size: 1.25rem;
              padding: 0.5rem;
            `}
          >
            Save
          </button>
          <button
            onClick={handleEdit}
            type="button"
            css={css`
              background-color: ${colors.secondary};
              font-color: black;
              border: 2px solid black;
              font-weight: bold;
              cursor: pointer;
              margin: 0 0.25rem;
              font-size: 1.25rem;
              padding: 0.5rem;
            `}
          >
            x
          </button>
        </div>
        <h2>Edit a Daily</h2>
        <input
          type="text"
          value={name}
          placeholder="Name..."
          onChange={handleNameChange}
          css={css`
            box-sizing: border-box;
            width: 350px;
            border: 2px solid ${colors.secondaryBackground};
            background-color: white;
            margin-bottom: 0.5rem;
            padding: 1rem;
            font-weight: bold;
          `}
        />
        <textarea
          rows="5"
          value={description}
          placeholder="Write a description"
          onChange={handleDescriptionChange}
          css={css`
            box-sizing: border-box;
            width: 350px;
            height: 100px;
            border: 2px solid ${colors.secondaryBackground};
            background-color: white;
            margin-bottom: 0.5rem;
            padding: 1rem;
            font-weight: bold;
            font-family: "Pontano Sans", sans-serif;
          `}
        />
      </form>
    </Modal>
  );
};

export default EditHabit;
