/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import Modal from "../Reusable/Modal";
import { colors, mediaQuery } from "../../constants/styleTheme";

const editButtonStyles = css`
  border: 2px solid black;
  font-weight: bold;
  cursor: pointer;
  margin: 0 0.25rem;
  font-size: 1.25rem;
  padding: 0.5rem;
`;

const inputStyles = css`
  box-sizing: border-box;
  width: 100%;
  border: 2px solid ${colors.secondaryBackground};
  background-color: white;
  margin-bottom: 0.5rem;
  padding: 1rem;
  margin: 0 0 1rem 0;
  font-weight: bold;
  ${mediaQuery} {
    width: 350px;
  }
`;

const EditTodoBase = ({
  handleUpdate,
  handleEdit,
  handleNameChange,
  name,
  description,
  handleDescriptionChange,
  labelName,
  labelDescription,
}) => (
  <Modal>
    <form
      onSubmit={(event) => handleUpdate(event)}
      css={css`
        display: flex;
        flex-flow: column wrap;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
          width: 100%;
        `}
      >
        <button
          onClick={(event) => handleUpdate(event)}
          type="submit"
          css={css`
            ${editButtonStyles}
            background-color: ${colors.primary};
            color: white;
          `}
        >
          Save
        </button>
        <button
          onClick={handleEdit}
          type="button"
          css={css`
            ${editButtonStyles}
            background-color: ${colors.secondary};
            color: black;
          `}
        >
          x
        </button>
      </div>
      <h2>Edit a Daily</h2>
      <label
        htmlFor={labelName}
        css={css`
          text-align: left;
        `}
      >
        Title
      </label>
      <input
        type="text"
        id={labelName}
        value={name}
        placeholder="Name..."
        onChange={handleNameChange}
        css={css`
          ${inputStyles}
        `}
      />
      <label
        htmlFor={labelDescription}
        css={css`
          text-align: left;
        `}
      >
        Description
      </label>
      <textarea
        rows="5"
        value={description}
        id={labelDescription}
        placeholder="Write a description"
        onChange={handleDescriptionChange}
        css={css`
          ${inputStyles}
          font-family: "Pontano Sans", sans-serif;
          height: 100px;
        `}
      />
    </form>
  </Modal>
);

export default EditTodoBase;
