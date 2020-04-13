import React, { useEffect, useState } from "react";
import { withFirebase } from "../../contexts/Firebase";
import Habit from "./Habit";
import { collectIdsAndDocsFirebase, sortOrderHabitTodo } from "../../utilities";

const HabitList = ({
  firebase,
  uid,
  date,
  handlePreviousClick,
  status,
  noEdit,
}) => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .dates()
      .where("user", "==", uid)
      .where("date", "==", date)
      .onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          let date = snapshot.docs.map(collectIdsAndDocsFirebase)[0];
          let habits = [...date.habits];
          if (habits.length) {
            setHabits(sortOrderHabitTodo(habits));
          } else {
            if (typeof handlePreviousClick == "function") {
              handlePreviousClick();
            }
          }
        } else {
          firebase.createDateWithHabits(date, uid);
        }
      });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMoveUp = async (targetHabit) => {
    if (targetHabit.order === 0) return;
    const updating = [];
    habits.forEach((habit, idx, arr) => {
      if (habit.id === targetHabit.id) {
        updating.push({ id: habit.id, order: arr[idx - 1].order });
        updating.push({ id: arr[idx - 1].id, order: habit.order });
      }
    });
    for (let i = 0; i < updating.length; i += 1) {
      await firebase.habit(updating[i].id).update({ order: updating[i].order });
    }
    await firebase.getHabitsAndUpdateDate();
  };

  const handleMoveDown = async (targetHabit) => {
    if (targetHabit.order === habits.length - 1) return;
    const updating = [];
    habits.forEach((habit, idx, arr) => {
      if (habit.id === targetHabit.id) {
        updating.push({ id: habit.id, order: arr[idx + 1].order });
        updating.push({ id: arr[idx + 1].id, order: habit.order });
      }
    });
    for (let i = 0; i < updating.length; i += 1) {
      await firebase.habit(updating[i].id).update({ order: updating[i].order });
    }
    await firebase.getHabitsAndUpdateDate();
  };

  const statusReturn = (habit) => ({
    all: true,
    due: !habit.done,
    "not due": habit.done,
  });

  return (
    <>
      {habits
        .filter((habit) => statusReturn(habit)[status])
        .map((habit) => (
          <Habit
            habit={habit}
            key={habit.id}
            date={date}
            noEdit={noEdit}
            handleMoveUp={handleMoveUp}
            handleMoveDown={handleMoveDown}
          />
        ))}
    </>
  );
};

export default withFirebase(HabitList);
