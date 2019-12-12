import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const withAuthorization = condition => Component => {
  const WithAuthorization = props => {
    const { firebase, history } = props;
    useEffect(() => {
      firebase.onAuthUserListener(
        authUser => {},
        () => {
          history.push(ROUTES.SIGN_IN);
        }
      );
    }, [firebase, history]);
    return (
      <AuthUserContext.Consumer>
        {authUser => condition(authUser) && <Component {...props} />}
      </AuthUserContext.Consumer>
    );
  };

  return compose(withRouter, withFirebase)(WithAuthorization);
};

export default withAuthorization;
