import React, { useState } from "react";

import Item from "./Item";
import { withFirebase } from "../../contexts/Firebase";
import EditHabit from "./EditHabit";

/*
 * Habit Schema
 * {
 *  createdAt: Date,
 *  description: String,
 *  name: String,
 *  user: uid,
 *  id: id
 * }
 */

const Habit = ({ habit, firebase, date, noEdit }) => {
  const [options, setOptions] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleToggle = () => {
    firebase.toggleHabit(habit, date);
  };

  const handleDelete = async () => {
    await firebase.habit(habit.id).delete();
    await firebase.getHabitsAndUpdateDate();
  };

  const toggleOptions = () => {
    setOptions(!options);
  };

  const closeOptions = () => {
    setOptions(false);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <>
      {edit && (
        <EditHabit handleEdit={handleEdit} habit={habit} firebase={firebase} />
      )}
      <Item
        data={habit}
        handleToggle={handleToggle}
        options={options}
        handleOptions={{
          closeOptions,
          toggleOptions,
          handleDelete,
          handleEdit
        }}
        noEdit
      />
    </>
  );
};

export default withFirebase(Habit);
