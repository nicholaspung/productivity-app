import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";

const UserItemBase = ({ firebase, match, location }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const localState = location.state;

  useEffect(() => {
    if (localState.user) {
      setUser(localState.user);
      return;
    }

    setLoading(true);

    firebase.db
      .collection("users")
      .doc(match.params.id)
      .get()
      .then(doc => {
        setUser(doc.data());
        setLoading(false);
      });
  }, [firebase, localState, match.params.id]);

  const onSendPasswordResetEmail = () => {
    firebase.doPasswordReset(localState.user.email);
  };

  return (
    <div>
      <h2>User ({match.params.id})</h2>
      {loading && <div>Loading...</div>}

      {user && (
        <div>
          <p>
            <strong>ID:</strong> {user.uid}
          </p>
          <p>
            <strong>E-Mail:</strong> {user.email}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <span>
            <button type="button" onClick={onSendPasswordResetEmail}>
              Send Password Reset
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default compose(withRouter, withFirebase)(UserItemBase);
