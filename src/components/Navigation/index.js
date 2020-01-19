import React from "react";
import "./navigation.css";

import { AuthUserContext } from "../../contexts/Session";
import NavigationAuth from "./NavigationAuth";
import NavigationNonAuth from "./NavigationNonAuth";

const Navigation = () => (
  <nav>
    <h1>Logo</h1>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </nav>
);

export default Navigation;
