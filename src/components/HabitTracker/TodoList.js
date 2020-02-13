import React, { useEffect, useState } from "react";
import { withFirebase } from "../../contexts/Firebase";
import Todo from "./Todo";
import { collectIdsAndDocsFirebase } from "../../utilities";

const TodoList = ({ firebase, uid, done, status }) => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firebase
      .todos()
      .where("done", "==", done)
      .where("user", "==", uid)
      .onSnapshot(snapshot => {
        if (!snapshot.empty) {
          const todosList = snapshot.docs.map(collectIdsAndDocsFirebase);

          // Need to order eventually
          setTodos(todosList);
        } else {
          setTodos([]);
        }
        setLoading(false);
      });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {todos
        .filter(habit => {
          let statusReturn = habit => ({
            active: !habit.done,
            completed: habit.done
          });
          return statusReturn(habit)[status];
        })
        .map(todo => (
          <Todo todo={todo} key={todo.name} />
        ))}
    </>
  );
};

export default withFirebase(TodoList);
