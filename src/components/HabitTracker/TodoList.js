import React, { useEffect, useState } from "react";
import { withFirebase } from "../../contexts/Firebase";
import Todo from "./Todo";
import {
  collectIdsAndDocsFirebase,
  sortOldToNewHabitTodo,
  sortPriorityTodo,
} from "../../utilities";

const TodoList = ({ firebase, uid, status }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .todos()
      .where("user", "==", uid)
      .onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          const todosList = snapshot.docs.map(collectIdsAndDocsFirebase);
          setTodos(sortPriorityTodo(sortOldToNewHabitTodo(todosList)));
        } else {
          setTodos([]);
        }
      });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMoveUp = async (todo, cb) => {
    cb();
    await firebase.todo(todo.id).update({ priority: "high" });
  };

  const handleMoveDown = async (todo, cb) => {
    cb();
    await firebase.todo(todo.id).update({ priority: "low" });
  };

  const statusReturn = (todo) => ({
    active: !todo.done,
    completed: todo.done,
  });

  return (
    <>
      {todos
        .filter((todo) => statusReturn(todo)[status])
        .map((todo) => (
          <Todo
            todo={todo}
            key={todo.id}
            handleMoveDown={handleMoveDown}
            handleMoveUp={handleMoveUp}
          />
        ))}
    </>
  );
};

export default withFirebase(TodoList);
