import React, { useEffect, useState } from "react";
import { withFirebase } from "../../contexts/Firebase";
import Todo from "./Todo";
import { collectIdsAndDocsFirebase } from "../../utilities";

const TodoList = ({ firebase, id }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribeFromTodos = firebase
      .todos()
      .where("user", "==", id)
      .where("done", "==", false)
      .onSnapshot(snapshot => {
        const todosList = snapshot.docs.map(collectIdsAndDocsFirebase);

        // Need to order eventually
        setTodos(todosList);
      });

    return () => unsubscribeFromTodos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return todos.length ? (
    todos.map(todo => <Todo todo={todo} key={todo.name} />)
  ) : (
    <div>Loading...</div>
  );
};

export default withFirebase(TodoList);
