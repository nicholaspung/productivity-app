import React from "react";
import { withFirebase } from "../../contexts/Firebase";

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

const Habit = ({ habit }) => (
  <div>
    <span>{habit.name}</span>
    {habit.description && <p>{habit.description}</p>}
  </div>
);

export default withFirebase(Habit);
