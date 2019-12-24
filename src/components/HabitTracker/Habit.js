import React, { useState } from "react";
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

const Habit = ({ habit, firebase }) => {
  const [options, setOptions] = useState(false);
  const [edit, setEdit] = useState(false);

  // work on handleToggle

  const handleDelete = () => {
    firebase.habit(habit.id).delete();
    firebase.getHabitsAndUpdateDate();
  };

  const handleOptions = () => {
    setOptions(!options);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };
  return (
    <div>
      <input type="checkbox" value={habit.done} checked={habit.done} />
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
      {edit &&
        {
          /* <EditTodo handleEdit={handleEdit} habit={habit} firebase={firebase} /> */
        }}
      {habit.description && <p>{habit.description}</p>}
    </div>
  );
};

export default withFirebase(Habit);
