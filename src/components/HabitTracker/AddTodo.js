/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import { colors } from "../../constants/styleTheme";
import useTextInput from "../../hooks/useTextInput";
import { withFirebase } from "../../contexts/Firebase";

const AddTodo = ({ firebase }) => {
  const [input, setInput, handleChange] = useTextInput();

  const handleSubmit = async event => {
    event.preventDefault();

    await firebase.addTodo({
      name: input,
      description: null, // String
      done: false,
      createdAt: new Date(),
      doneAt: null, // Date
      user: firebase.auth.currentUser.uid,
      priority: "low"
    });

    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      css={css`
        background-color: ${colors.primaryBackground};
      `}
    >
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Add a Todo"
        css={css`
          box-sizing: border-box;
          width: 100%;
          border: 2px solid ${colors.secondaryBackground};
          background-color: ${colors.secondaryBackground};
          margin-bottom: 0.5rem;
          padding: 1rem;
          font-weight: bold;
          &:focus {
            background-color: white;
          }
        `}
      />
    </form>
  );
};

export default withFirebase(AddTodo);
