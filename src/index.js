import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";

import "./global.css";
import App from "./components/App";
import Firebase, { FirebaseContext } from "./contexts/Firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
