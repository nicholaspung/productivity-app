/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");
const body = document.body;

const Modal = ({ children, handleClose = () => {}, type = "default" }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  const defaultStyles = {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    alignItems: "flex-start"
  };
  if (type !== "default") {
    defaultStyles.backgroundColor = "rgba(0, 0, 0)";
    defaultStyles.alignItems = "center";
    defaultStyles.media700px = "max-width: 700px";
  }

  const onClose = event => {
    if (
      Array.from(event.target.classList)
        .concat(" ")
        .includes("overlay")
    )
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
  console.log(defaultStyles.media700px);
  return createPortal(
    <div
      css={css`
        background-color: ${defaultStyles.backgroundColor};
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: ${defaultStyles.alignItems};
        padding: 3rem;
      `}
      className={"overlay"}
      onClick={event => onClose(event)}
    >
      <div
        css={css`
          background-color: white;
          max-width: 350px;
          padding: 15px;
          text-align: center;
          @media only screen and (min-width: 700px) {
            ${defaultStyles.media700px && defaultStyles.media700px}
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
