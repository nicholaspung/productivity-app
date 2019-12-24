import React from "react";
import useTextInput from "../../hooks/useTextInput";
import { withFirebase } from "../../contexts/Firebase";

const AddTodo = ({ firebase, id }) => {
  const [input, setInput, handleChange] = useTextInput();

  const handleSubmit = event => {
    event.preventDefault();

    firebase.addTodo({
      name: input,
      description: null, // String
      done: false,
      createdAt: new Date(),
      doneAt: null, // Date
      user: id
    });

    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Add a To-Do"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default withFirebase(AddTodo);