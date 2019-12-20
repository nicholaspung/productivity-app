import React, { useState } from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withEmailVerification = Component => {
  const WithEmailVerification = props => {
    const { firebase } = props;
    const [isSent, setIsSent] = useState(false);

    const onSendEmailVerification = () => {
      firebase.doSendEmailVerification().then(() => setIsSent(true));
    };

    return (
      <AuthUserContext.Consumer>
        {authUser =>
          needsEmailVerification(authUser) ? (
            <div>
              {isSent ? (
                <p>
                  E-Mail confirmation sent: Check your E-Mails (Spam folder
                  included) for a confirmation E-Mail. Refresh this page once
                  you confirmed your E-Mail
                </p>
              ) : (
                <p>
                  Verify your E-Mail: Check your E-Mails (Spam folder included)
                  for a confirmation E-Mail or send another confirmation E-Mail.
                </p>
              )}
              <button
                type="button"
                onClick={onSendEmailVerification}
                disabled={isSent}
              >
                Send confirmation E-Mail
              </button>
            </div>
          ) : (
            <Component {...props} />
          )
        }
      </AuthUserContext.Consumer>
    );
  };
  return withFirebase(WithEmailVerification);
};

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes("password");

export default withEmailVerification;
