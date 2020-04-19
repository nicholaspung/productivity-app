import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./store";

import * as serviceWorker from "./serviceWorker";

import "./global.css";
import App from "./components/App";

const body = document.body;
body.classList.toggle("noscroll", false);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
