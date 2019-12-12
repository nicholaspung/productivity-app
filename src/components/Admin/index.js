import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { withAuthorization, withEmailVerification } from "../Session";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>

    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
);

const UserListBase = ({ firebase }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      setLoading(false);
      setUsers(usersList);
    });

    return firebase.users().off();
  }, [firebase]);

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
              <Link to={`${ROUTES.ADMIN}/${user.uid}`}>Details</Link>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const UserItemBase = ({ firebase, match }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    firebase.users(match.params.id).on("value", snapshot => {
      setLoading(false);
      setUser(snapshot.val());
    });

    return firebase.users(match.params.id).off();
  }, [firebase, match.params.id]);

  return (
    <div>
      <h2>User ({match.params.id})</h2>
      {loading && <div>Loading...</div>}

      {user && (
        <div>
          <p>
            <strong>ID:</strong> {user.uid}
          </p>
          <p>
            <strong>E-Mail:</strong> {user.email}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
        </div>
      )}
    </div>
  );
};

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(AdminPage);
