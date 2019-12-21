import React, { useEffect, useState } from "react";
import { withFirebase } from "../../contexts/Firebase";
import Todo from "./Todo";

const TodoList = ({ firebase, id }) => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setLoading(true);

    // subscribe to real-time updates next
    firebase
      .todos()
      .where("user", "==", id)
      .get()
      .then(docs => {
        let todosList = [];
        docs.forEach(doc => todosList.push({ ...doc.data() }));

        setTodos(todosList);
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    todos.map(todo => <Todo todo={todo} key={todo.name}/>)
  );
};

export default withFirebase(TodoList);
