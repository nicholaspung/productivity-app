import React from "react";

import AddTodoBase from "./AddTodoBase";
import useTextInput from "../../hooks/useTextInput";
import { withFirebase } from "../../contexts/Firebase";

const AddTodo = ({ firebase }) => {
  const [input, setInput, handleChange] = useTextInput();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await firebase.addTodo({
      name: input,
      description: null, // String
      done: false,
      createdAt: new Date(),
      doneAt: null, // Date
      user: firebase.auth.currentUser.uid,
      priority: "low",
    });

    setInput("");
  };

  return (
    <AddTodoBase
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      input={input}
    />
  );
};

export default withFirebase(AddTodo);
