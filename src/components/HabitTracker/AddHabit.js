import React from "react";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Add a Habit"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default withFirebase(AddHabit);
