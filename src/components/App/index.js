import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../Authentication/SignUp";
import SignInPage from "../Authentication/SignIn";
import PasswordForgetPage from "../Authentication/PasswordForget";
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
      <Navigation />

      <Switch>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route
          exact
          path={ROUTES.PASSWORD_FORGET}
          component={PasswordForgetPage}
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
