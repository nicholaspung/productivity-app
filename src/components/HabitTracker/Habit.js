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
    <li className="habit-item">
      <input
        type="checkbox"
        checked={habit.done}
        value={habit.done}
        onChange={handleToggle}
      />
      <div className="habit-item-name-container">
        <p className="habit-item-name">{habit.name}</p>
        {habit.description && (
          <p className="habit-item-description">{habit.description}</p>
        )}
      </div>
      <div className="habit-button">
        {!options ? (
          <button
            type="button"
            onClick={handleOptions}
            className="habit-options-button"
          >
            Options
          </button>
        ) : (
          <div className="habit-options">
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
          </div>
        )}
      </div>
      {edit && (
        <EditHabit handleEdit={handleEdit} habit={habit} firebase={firebase} />
      )}
    </li>
  );
};

export default withFirebase(Habit);
