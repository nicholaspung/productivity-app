import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../../contexts/Firebase";

const UserListBase = ({ firebase }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);

    firebase.db
      .collection("users")
      .get()
      .then(doc => {
        let usersList = [];
        doc.forEach(doc => usersList.push({ ...doc.data(), uid: doc.id }));

        setUsers(usersList);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {loading && <div>Loading...</div>}
      <ul>
        {users.map(user => (
          <li key={user.uid}>
            <p>
              <strong>ID:</strong> {user.uid}
            </p>
            <p>
              <strong>E-Mail:</strong> {user.email}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <span>
              <Link
                to={{
                  pathname: `${ROUTES.ADMIN}/${user.uid}`,
                  state: { user }
                }}
              >
                Details
              </Link>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withFirebase(UserListBase);
