/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
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

const Habit = ({ habit, firebase, date }) => {
  const [options, setOptions] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleToggle = () => {
    console.log("hi");
    firebase.toggleHabit(habit, date);
    console.log("firing");
  };

  const handleDelete = async () => {
    await firebase.habit(habit.id).delete();
    await firebase.getHabitsAndUpdateDate();
  };

  const handleOptions = () => {
    setOptions(!options);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  return <Item data={habit} itemType="habit" handleToggle={handleToggle} />;
};

export default withFirebase(Habit);
