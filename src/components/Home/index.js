import React from "react";
import { compose } from "recompose";

import {
  withAuthorization,
  withEmailVerification,
  AuthUserContext
} from "../../contexts/Session";
import HabitTracker from "../HabitTracker";
import Calendar from "../Calendar";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>The Home Page is accessible by every signed in user.</p>
      <AuthUserContext.Consumer>
        {authUser => <HabitTracker authUser={authUser} />}
      </AuthUserContext.Consumer>
      <Calendar />
    </div>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
