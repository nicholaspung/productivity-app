import React from "react";
import { compose } from "recompose";
import "./home.css";

import {
  withAuthorization,
  withEmailVerification,
  AuthUserContext
} from "../../contexts/Session";
import HabitTracker from "../HabitTracker";
import Calendar from "../Calendar";

const HomePage = () => {
  return (
    <main>
      <Calendar />
      <div className="home-info">
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
      </div>
      <AuthUserContext.Consumer>
        {authUser => <HabitTracker authUser={authUser} />}
      </AuthUserContext.Consumer>
    </main>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
