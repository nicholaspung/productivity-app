import React, { useEffect, useState } from "react";
import { withFirebase } from "../../contexts/Firebase";
import Habit from "./Habit";
import { collectIdsAndDocsFirebase } from "../../utilities";

const HabitList = ({ firebase, id, date }) => {
  const [loading, setLoading] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    setLoading(true);
    const unsubscribeFromHabits = firebase
      .dates()
      .where("date", "==", date)
      .onSnapshot(snapshot => {
        if (!snapshot.empty) {
          let date = snapshot.docs.map(collectIdsAndDocsFirebase)[0];
          setHabits(date.habits);
        } else {
          firebase
            .habits()
            .get()
            .then(snapshot => {
              let habits = snapshot.docs.map(collectIdsAndDocsFirebase);

              habits = habits.map(habit => ({ ...habit, done: false }));

              firebase.dates().add({
                user: id,
                date: date,
                habits: habits
              });
            });
        }
        setLoading(false);
        setDoneLoading(true);
      });

    return () => unsubscribeFromHabits();
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
      {doneLoading && <div>You have no habits.</div>}
    </>
  );
};

export default withFirebase(HabitList);
