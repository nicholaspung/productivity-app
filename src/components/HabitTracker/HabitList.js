import React, { useEffect, useState } from "react";
import { withFirebase } from "../../contexts/Firebase";
import Habit from "./Habit";
import { collectIdsAndDocsFirebase, getTodaysDate } from "../../utilities";

const HabitList = ({ firebase, id }) => {
  const [loading, setLoading] = useState(false);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    setLoading(true);
    let today = getTodaysDate(new Date());
    const unsubscribeFromHabits = firebase
      .dates()
      .where("date", "==", today)
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

              firebase.dates().add({
                id: id,
                date: today,
                habits: habits
              });
            });
        }
        setLoading(false);
      });

    return () => unsubscribeFromHabits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading || !habits.length ? (
        habits.map(habit => <Habit habit={habit} key={habit.name} />)
      ) : (
        <div>You have no habits.</div>
      )}
    </>
  );
};

export default withFirebase(HabitList);
