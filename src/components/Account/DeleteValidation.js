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
      label="Yes"
      styles={{
        width: "150px",
        backgroundColor: "white",
        paddingRem: "2",
        mediaPaddingRem: "0.5"
      }}
    />
    <Button
      onClickAction={() => setShowDelete(false)}
      label="No"
      styles={{
        width: "150px",
        backgroundColor: "red",
        paddingRem: "2",
        mediaPaddingRem: "0.5"
      }}
    />
  </Modal>
);

export default withFirebase(DeleteValidation);
