import React from "react";
import { Switch, Route } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { withAuthorization, withEmailVerification } from "../Session";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";
import UserItem from "./UserItem";
import UserList from "./UserList";

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>

    <Switch>
      <Route exact path={ROUTES.ADMIN} component={UserList} />
      <Route exact path={`${ROUTES.ADMIN}/:id`} component={UserItem} />
    </Switch>
  </div>
);

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(AdminPage);
