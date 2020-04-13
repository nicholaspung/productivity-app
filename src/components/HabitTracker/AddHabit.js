import React from "react";

import { withFirebase } from "../../contexts/Firebase";
import useTextInput from "../../hooks/useTextInput";
import AddTodoBase from "./AddTodoBase";
import { getTodaysDate } from "../../utilities";

const AddHabit = ({ firebase }) => {
  const date = getTodaysDate(new Date());
  const [input, setInput, handleChange] = useTextInput();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let snapshot = await firebase
      .dates()
      .where("date", "==", date)
      .where("user", "==", firebase.auth.currentUser.uid)
      .get();
    const length = snapshot.docs[0].data().habits.length;

    await firebase.addHabit({
      name: input,
      description: null, // String
      createdAt: new Date(),
      user: firebase.auth.currentUser.uid,
      order: length,
    });

    await firebase.getHabitsAndUpdateDate();

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

export default withFirebase(AddHabit);
