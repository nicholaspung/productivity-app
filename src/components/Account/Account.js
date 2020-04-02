/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React, { useState } from "react";
import { compose } from "recompose";
import { Helmet } from "react-helmet";

import {
  withAuthorization,
  AuthUserContext,
  withEmailVerification
} from "../../contexts/Session";
import LoginManagement from "./LoginManagement";
import { containers } from "../../constants/styleTheme";
import Button from "../Reusable/Button";
import DeleteValidation from "./DeleteValidation";

const AccountPage = () => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <React.Fragment>
          <Helmet>
            <title>Account - Your Toolbox</title>
            <meta name="description" content="Account - Toolbox" />
          </Helmet>
          {showDelete && <DeleteValidation />}
          <div
            css={css`
              text-align: center;
              margin: auto;
              padding-bottom: ${containers.spacing};
              @media only screen and (min-width: 700px) {
                width: ${containers.secondary};
              }
            `}
          >
            <h1>Your Account</h1>
            <LoginManagement authUser={authUser} />
            <h2>Delete Account</h2>
            <Button
              onClickAction={() => setShowDelete(true)}
              label="Delete"
              styles={{
                width: "150px",
                backgroundColor: "red",
                mediaPaddingRem: "1"
              }}
            />
          </div>
        </React.Fragment>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
