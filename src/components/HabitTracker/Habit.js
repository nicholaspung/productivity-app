import React, { useState } from "react";

import Item from "./Item";
import { withFirebase } from "../../contexts/Firebase";
import EditHabit from "./EditHabit";
import { sortOrderHabitTodo } from "../../utilities";

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

  const handleMoveUp = async habitOrder => {
    const order = JSON.parse(localStorage.getItem("sortedHabits"));
    if (habitOrder === 0) return null;
    let updateTheseInFirebase = [];
    let updateTheseInLocalStorage = [];
    order.forEach((orderHabit, idx, arr) => {
      if (orderHabit.id === habit.id) {
        [orderHabit.order, arr[idx - 1].order] = [
          arr[idx - 1].order,
          orderHabit.order
        ];
        updateTheseInFirebase = [orderHabit, arr[idx - 1]];
        updateTheseInLocalStorage = [orderHabit, arr[idx - 1]];
      }
    });
    order.forEach(orderHabit => {
      if (!updateTheseInFirebase.find(el => el.id === orderHabit.id)) {
        updateTheseInLocalStorage.push(orderHabit);
      }
    });
    localStorage.setItem(
      "sortedHabits",
      JSON.stringify(sortOrderHabitTodo(updateTheseInLocalStorage))
    );

    for (let i = 0; i < updateTheseInFirebase.length; i += 1) {
      await firebase
        .habit(updateTheseInFirebase[i].id)
        .update({ order: updateTheseInFirebase[i].order });
    }
  };

  const handleMoveDown = async habitOrder => {
    const order = JSON.parse(localStorage.getItem("sortedHabits"));
    if (habitOrder === order.length - 1) return null;
    let updateTheseInFirebase = [];
    let updateTheseInLocalStorage = [];
    order.forEach((orderHabit, idx, arr) => {
      if (orderHabit.id === habit.id) {
        [orderHabit.order, arr[idx + 1].order] = [
          arr[idx + 1].order,
          orderHabit.order
        ];
        updateTheseInFirebase = [orderHabit, arr[idx + 1]];
        updateTheseInLocalStorage = [orderHabit, arr[idx + 1]];
      }
    });

    order.forEach(orderHabit => {
      if (!updateTheseInFirebase.find(el => el.id === orderHabit.id)) {
        updateTheseInLocalStorage.push(orderHabit);
      }
    });
    localStorage.setItem(
      "sortedHabits",
      JSON.stringify(sortOrderHabitTodo(updateTheseInLocalStorage))
    );
    for (let i = 0; i < updateTheseInFirebase.length; i += 1) {
      await firebase
        .habit(updateTheseInFirebase[i].id)
        .update({ order: updateTheseInFirebase[i].order });
    }
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
          handleEdit,
          handleMoveUp,
          handleMoveDown
        }}
        noEdit={noEdit}
      />
    </>
  );
};

export default withFirebase(Habit);
