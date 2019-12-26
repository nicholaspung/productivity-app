import React, { useState } from "react";
import { withFirebase } from "../../contexts/Firebase";
import { getTodaysDate } from "../../utilities";
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

const Habit = ({ habit, firebase }) => {
  const [options, setOptions] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleToggle = () => {
    let today = getTodaysDate(new Date());
    firebase
      .dates()
      .where("date", "==", today)
      .get()
      .then(snapshot => {
        let date = snapshot.docs[0];
        let updatedHabits = date.data().habits.map(h => {
          if (h.id === habit.id) {
            h.done = !h.done;
          }
          return h;
        });

        firebase.date(date.id).update({ habits: updatedHabits });
      });
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
      <input type="checkbox" checked={habit.done} onChange={handleToggle} />
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
