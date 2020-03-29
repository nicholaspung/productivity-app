import React from "react";

import Modal from "./Modal";
import QuoteOfTheDay from "./QuoteOfTheDay";

const LoadingScreen = () => (
  <Modal type="loading">
    <QuoteOfTheDay />
    <p>Your Toolbox is loading...</p>
  </Modal>
);

export default LoadingScreen;
