import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "../Header";
import LandingPage from "../Landing";
import SignInPage from "../Authentication";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import NotFoundPage from "../404";
import Footer from "../Footer";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../../contexts/Session";

const App = () => (
  <Router>
    <>
      <Header />

      <Switch>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route
          exact
          path={ROUTES.REGISTER}
          render={() => <SignInPage title="Register" />}
        />
        <Route
          exact
          path={ROUTES.SIGN_IN}
          render={() => <SignInPage title="Sign In" />}
        />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route component={NotFoundPage} />
      </Switch>

      <Footer />
    </>
  </Router>
);

export default withAuthentication(App);
