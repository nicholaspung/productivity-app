import React, { useEffect, useState } from "react";
import { withFirebase } from "../../contexts/Firebase";
import Habit from "./Habit";
import { collectIdsAndDocsFirebase } from "../../utilities";

const HabitList = ({ firebase, uid, date }) => {
  const [loading, setLoading] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    setLoading(true);
    firebase
      .dates()
      .where("user", "==", uid)
      .where("date", "==", date)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firebase
            .habits()
            .where("user", "==", uid)
            .get()
            .then(snapshot => {
              let habits = snapshot.docs.map(collectIdsAndDocsFirebase);

              habits = habits.map(habit => ({ ...habit, done: false }));

              firebase.dates().add({
                user: uid,
                date: date,
                habits: habits
              });
            });
        }
      });
    const unsubscribe = firebase
      .dates()
      .where("user", "==", uid)
      .where("date", "==", date)
      .onSnapshot(snapshot => {
        if (!snapshot.empty) {
          let date = snapshot.docs.map(collectIdsAndDocsFirebase)[0];
          setHabits(date.habits);
        }
        setLoading(false);
        setDoneLoading(true);
      });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading || !habits.length
        ? habits.map(habit => (
            <Habit habit={habit} key={habit.name} date={date} />
          ))
        : null}
      {doneLoading && !habits.length && <div>You have no habits.</div>}
    </>
  );
};

export default withFirebase(HabitList);
