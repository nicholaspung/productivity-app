/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React, { useState } from "react";
import { createPortal } from "react-dom";

const rootNode = document.getElementById("root");

const useModal = () => {
  const [modalStatus, setModalStatus] = useState(false);

  const closeModal = ({ node }) => {
    setModalStatus(false);
    rootNode.removeChild(node);
  };

  const openModal = ({ node }) => {
    setModalStatus(true);
    rootNode.appendChild(node);
  };

  const Modal = ({ children }) => {
    const [el] = useState(document.createElement("div"));
    return createPortal(children, el);
  };

  return { openModal, Modal };
};

export default useModal;
