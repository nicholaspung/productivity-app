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
  noEdit
}) => {
  const [loading, setLoading] = useState(false);
  const [habits, setHabits] = useState([]);

  const [order, setOrder] = useState([{}]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firebase
      .dates()
      .where("user", "==", uid)
      .where("date", "==", date)
      .onSnapshot(snapshot => {
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
          if (!localStorage.getItem("sortedHabits")) {
            const initialOrder = habits.map((habit, idx) => ({
              id: habit.id,
              name: habit.name,
              order: idx
            }));
            localStorage.setItem("sortedHabits", JSON.stringify(initialOrder));
          }
          setOrder(JSON.parse(localStorage.getItem("sortedHabits")));
        } else {
          firebase.createDateWithHabits(date, uid);
        }
        setLoading(false);
      });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(habits);
  return (
    <>
      {habits
        .filter(habit => {
          let statusReturn = habit => ({
            all: true,
            due: !habit.done,
            "not due": habit.done
          });
          return statusReturn(habit)[status];
        })
        .map(habit => (
          <Habit habit={habit} key={habit.id} date={date} noEdit={noEdit} />
        ))}
    </>
  );
};

export default withFirebase(HabitList);
