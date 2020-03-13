/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import { colors } from "../../constants/styleTheme";
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
        <h2>Edit a Todo</h2>
        <label
          for="todo-title"
          css={css`
            text-align: left;
          `}
        >
          Title
        </label>
        <input
          for="todo-title"
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
            margin: 0 0 1rem 0;
            font-weight: bold;
          `}
        />
        <label
          for="todo-description"
          css={css`
            text-align: left;
          `}
        >
          Description
        </label>
        <textarea
          for="todo-description"
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
            margin: 0 0 1rem 0;
            font-weight: bold;
            font-family: "Pontano Sans", sans-serif;
          `}
        />
      </form>
    </Modal>
  );
};

export default EditTodo;
