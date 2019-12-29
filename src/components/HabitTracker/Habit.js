import React, { useState } from "react";
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
    firebase.toggleHabit(habit, date);
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
  return (
    <div>
      <input
        type="checkbox"
        checked={habit.done}
        value={habit.done}
        onChange={handleToggle}
      />
      <span>{habit.name}</span>
      {!options ? (
        <button type="button" onClick={handleOptions}>
          Options
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={() => {
              handleEdit();
              handleOptions();
            }}
          >
            Edit
          </button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" onClick={handleOptions}>
            Cancel
          </button>
        </>
      )}
      {edit && (
        <EditHabit handleEdit={handleEdit} habit={habit} firebase={firebase} />
      )}
      {habit.description && <p>{habit.description}</p>}
    </div>
  );
};

export default withFirebase(Habit);
