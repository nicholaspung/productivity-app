/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { mediaQuery } from "../../constants/styleTheme";

const modalRoot = document.getElementById("modal");
const body = document.body;

const Modal = ({ children, handleClose = () => {} }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  const onClose = (event) => {
    if (Array.from(event.target.classList).concat(" ").includes("overlay"))
      handleClose();
  };

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
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 3rem;
      `}
      className={"overlay"}
      onClick={(event) => onClose(event)}
    >
      <div
        css={css`
          background-color: white;
          padding: 15px;
          text-align: center;
          width: 100%;
          ${mediaQuery} {
            max-width: 350px;
          }
        `}
      >
        {children}
      </div>
    </div>,
    elRef.current
  );
};

export default Modal;
