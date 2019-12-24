import React, { useEffect, useState } from "react";
import { withFirebase } from "../../contexts/Firebase";
import Todo from "./Todo";
import { collectIdsAndDocsFirebase } from "../../utilities";

const TodoList = ({ firebase, id, done }) => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setLoading(true);
    const unsubscribeFromTodos = firebase
      .todos()
      .where("user", "==", id)
      .where("done", "==", done)
      .onSnapshot(snapshot => {
        if (!snapshot.empty) {
          const todosList = snapshot.docs.map(collectIdsAndDocsFirebase);

          // Need to order eventually
          setTodos(todosList);
        }
        setLoading(false);
      });

    return () => unsubscribeFromTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <div>Loading...</div> : null}
      {!loading || !todos.length ? (
        todos.map(todo => <Todo todo={todo} key={todo.name} />)
      ) : (
        <div>You have no {done && "archived"} todos.</div>
      )}
    </>
  );
};

export default withFirebase(TodoList);
