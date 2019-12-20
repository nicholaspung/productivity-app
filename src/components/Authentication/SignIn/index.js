import React from "react";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import SignInForm from "./SignInForm";
import SignInWith from "./SignInWith";
import { withFirebase } from "../../contexts/Firebase";

const signInMethods = ["google", "facebook", "twitter", "github"];

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    {signInMethods.map(provider => (
      <SignInWith key={provider} provider={provider} />
    ))}
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

export default withFirebase(SignInPage);
