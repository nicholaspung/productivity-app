import React, { useState, useEffect } from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withAuthentication = Component => {
  const WithAuthentication = props => {
    const [authUser, setAuthUser] = useState(
      JSON.parse(localStorage.getItem("authUser"))
    );
    const { firebase } = props;

    useEffect(() => {
      firebase.onAuthUserListener(
        authUserObject => {
          localStorage.setItem("authUser", JSON.stringify(authUserObject));
          setAuthUser(authUserObject);
        },
        () => {
          localStorage.removeItem("authUser");
          setAuthUser(null);
        }
      );
    }, [firebase]);

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
