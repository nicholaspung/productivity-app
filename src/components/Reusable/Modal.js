/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");
const body = document.body;

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    body.classList.toggle("noscroll", true);
    return () => {
      modalRoot.removeChild(elRef.current);
      body.classList.toggle("noscroll", false);
    };
  }, []);

  return createPortal(
    <div
      css={css`
        background-color: rgba(0, 0, 0, 0.9);
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
      // className={"overlay"}
    >
      <div
        css={css`
          background-color: white;
          max-width: 350px;
          padding: 15px;
          text-align: center;
        `}
      >
        {children}
      </div>
    </div>,
    elRef.current
  );
};

export default Modal;
