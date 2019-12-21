import React from "react";

import { withFirebase } from "../../contexts/Firebase";
import useTextInput from "../../hooks/useTextInput";

const AddDaily = ({ firebase, id }) => {
  const [input, setInput, handleChange] = useTextInput();

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Add a Daily"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default withFirebase(AddDaily);
