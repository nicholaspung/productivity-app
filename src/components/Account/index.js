/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React, { useState } from "react";
import { compose } from "recompose";

import {
  withAuthorization,
  AuthUserContext,
  withEmailVerification
} from "../../contexts/Session";
import { withFirebase } from "../../contexts/Firebase";
import LoginManagement from "./LoginManagement";
import { containers } from "../../constants/styleTheme";
import Modal from "../Reusable/Modal";

const AccountPage = ({ firebase }) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <>
          {showDelete && (
            <Modal>
              <h1>Are you sure you want to delete your account?</h1>
              <button
                onClick={() => firebase.deleteUserAndUserData(authUser.uid)}
                css={css`
                  margin: auto;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border: 0;
                  font-weight: bold;
                  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
                  cursor: pointer;
                  width: 150px;
                  font-size: 1.25rem;
                  background-color: white;
                  padding: 1rem;
                  @media only screen and (min-width: 700px) {
                    font-size: 1.5rem;
                    padding: 0.5rem;
                  }

                  &:hover {
                    box-shadow: 0 0 6px #4285f4;
                  }
                `}
              >
                Yes
              </button>
              <button
                onClick={() => setShowDelete(false)}
                css={css`
                  margin: auto;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border: 0;
                  font-weight: bold;
                  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
                  cursor: pointer;
                  width: 150px;
                  font-size: 1.25rem;
                  background-color: red;
                  padding: 1rem;
                  @media only screen and (min-width: 700px) {
                    font-size: 1.5rem;
                    padding: 0.5rem;
                  }

                  &:hover {
                    box-shadow: 0 0 6px #4285f4;
                  }
                `}
              >
                No
              </button>
            </Modal>
          )}
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
            <button
              onClick={() => setShowDelete(true)}
              css={css`
                margin: auto;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 0;
                font-weight: bold;
                box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
                cursor: pointer;
                width: 150px;
                font-size: 1.25rem;
                background-color: red;
                @media only screen and (min-width: 700px) {
                  font-size: 1.5rem;
                  padding: 1rem;
                }

                &:hover {
                  box-shadow: 0 0 6px #4285f4;
                }
              `}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
