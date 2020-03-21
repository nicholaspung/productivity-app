import React, { useEffect, useState } from "react";
import { withFirebase } from "../../contexts/Firebase";
import Todo from "./Todo";
import {
  collectIdsAndDocsFirebase,
  sortOldToNewHabitTodo,
  sortPriorityTodo
} from "../../utilities";

const TodoList = ({ firebase, uid, status }) => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  const handleMoveUp = async targetTodo => {
    await firebase.todo(targetTodo.id).update({ priority: "high" });
    await firebase
      .todos()
      .where("user", "==", uid)
      .get()
      .then(snapshot => {
        const todosList = [...snapshot.docs.map(collectIdsAndDocsFirebase)];
        setTodos(sortPriorityTodo(sortOldToNewHabitTodo(todosList)));
      });
  };

  const handleMoveDown = async targetTodo => {
    await firebase.todo(targetTodo.id).update({ priority: "low" });
    await firebase
      .todos()
      .where("user", "==", uid)
      .get()
      .then(snapshot => {
        const todosList = [...snapshot.docs.map(collectIdsAndDocsFirebase)];
        setTodos(sortPriorityTodo(sortOldToNewHabitTodo(todosList)));
      });
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firebase
      .todos()
      .where("user", "==", uid)
      .onSnapshot(snapshot => {
        if (!snapshot.empty) {
          const todosList = [...snapshot.docs.map(collectIdsAndDocsFirebase)];
          setTodos(sortPriorityTodo(sortOldToNewHabitTodo(todosList)));
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
        .filter(todo => {
          let statusReturn = todo => ({
            active: !todo.done,
            completed: todo.done
          });
          return statusReturn(todo)[status];
        })
        .map(todo => (
          <Todo
            todo={todo}
            key={todo.name}
            handleMoveDown={handleMoveDown}
            handleMoveUp={handleMoveUp}
          />
        ))}
    </>
  );
};

export default withFirebase(TodoList);
