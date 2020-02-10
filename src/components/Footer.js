/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import { colors } from "../constants/styleTheme";

const Footer = () => (
  <footer
    css={css`
      text-align: center;
      background-color: ${colors.secondaryBackground};
      padding: 1rem;
    `}
  >
    <p>© 2020, Nicholas Pung</p>
  </footer>
);

export default Footer;
