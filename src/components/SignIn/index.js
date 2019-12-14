import React from "react";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import SignInForm from "./SignInForm";
import SignInFacebook from "./SignInFacebook";
import SignInGoogle from "./SignInGoogle";
import SignInTwitter from "./SignInTwitter";

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignInGoogle />
    <SignInFacebook />
    <SignInTwitter />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

export default SignInPage;

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };
