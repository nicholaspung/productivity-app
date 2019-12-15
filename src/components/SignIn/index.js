import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import SignInForm from "./SignInForm";
import { withFirebase } from "../Firebase";

const SignInPage = ({ firebase }) => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <div style={{ height: "205px", padding: "1rem 0px" }}>
      <StyledFirebaseAuth
        uiConfig={firebase.uiConfig}
        firebaseAuth={firebase.auth}
      />
    </div>
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

export default withFirebase(SignInPage);
