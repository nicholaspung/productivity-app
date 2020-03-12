/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import { colors } from "../../constants/styleTheme";
import { withFirebase } from "../../contexts/Firebase";
import useTextInput from "../../hooks/useTextInput";

const AddHabit = ({ firebase }) => {
  const [input, setInput, handleChange] = useTextInput();

  const handleSubmit = async event => {
    event.preventDefault();

    await firebase.addHabit({
      name: input,
      description: null, // String
      createdAt: new Date(),
      user: firebase.auth.currentUser.uid
    });

    await firebase.getHabitsAndUpdateDate();

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
        placeholder="Add a Habit"
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

export default withFirebase(AddHabit);
