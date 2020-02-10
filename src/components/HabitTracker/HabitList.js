import React, { useEffect, useState } from "react";
import { withFirebase } from "../../contexts/Firebase";
import Habit from "./Habit";
import { collectIdsAndDocsFirebase } from "../../utilities";

const HabitList = ({ firebase, uid, date, handlePreviousClick }) => {
  const [loading, setLoading] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    setLoading(true);
    firebase.checkIfDateIsCreated(date, uid);
    const unsubscribe = firebase
      .dates()
      .where("user", "==", uid)
      .where("date", "==", date)
      .onSnapshot(snapshot => {
        if (!snapshot.empty) {
          let date = snapshot.docs.map(collectIdsAndDocsFirebase)[0];

          let habits = date.habits;
          if (habits.length) {
            setHabits(habits);
          } else {
            if (typeof handlePreviousClick == "function") {
              handlePreviousClick();
            }
          }
        }
        setLoading(false);
        setDoneLoading(true);
      });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {habits.map(habit => (
        <Habit habit={habit} key={habit.name} date={date} />
      ))}
    </>
  );
};

export default withFirebase(HabitList);
