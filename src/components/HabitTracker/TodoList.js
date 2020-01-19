import React, { useEffect, useState } from "react";
import { withFirebase } from "../../contexts/Firebase";
import Todo from "./Todo";
import { collectIdsAndDocsFirebase } from "../../utilities";

const TodoList = ({ firebase, uid, done }) => {
  const [loading, setLoading] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
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
        setDoneLoading(true);
      });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="habit-list">
      {loading && <p>Loading...</p>}
      {!loading || !todos.length ? (
        <ul>
          {todos.map(todo => (
            <Todo todo={todo} key={todo.name} />
          ))}
        </ul>
      ) : null}
      {doneLoading && !todos.length && (
        <p>You have no {done && "archived"} todos.</p>
      )}
    </section>
  );
};

export default withFirebase(TodoList);
