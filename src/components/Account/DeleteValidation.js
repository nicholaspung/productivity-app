/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";
import Modal from "../Reusable/Modal";
import Button from "../Reusable/Button";
import { withFirebase } from "../../contexts/Firebase";

const DeleteValidation = ({ firebase, setShowDelete }) => (
  <Modal>
    <h1>Are you sure you want to delete your account?</h1>
    <Button
      onClickAction={() =>
        firebase.deleteUserAndUserData(firebase.auth.currentUser.uid)
      }
    >
      Yes
    </Button>
    <Button
      onClickAction={() => setShowDelete(false)}
      styles={css`
        background-color: red;
      `}
    >
      No
    </Button>
  </Modal>
);

export default withFirebase(DeleteValidation);
