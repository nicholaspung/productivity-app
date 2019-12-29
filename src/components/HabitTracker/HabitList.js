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
    firebase.checkIfDateIsCreated(date, uid);
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
