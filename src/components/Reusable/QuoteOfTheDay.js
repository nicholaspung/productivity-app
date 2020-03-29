/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";
import { getDate } from "date-fns";
import useLocalStorage from "../../hooks/useLocalStorage";
import { colors } from "../../constants/styleTheme";
import { testQuotes } from "../../constants/quotes";

const QuoteOfTheDay = () => {
  const [quotes] = useLocalStorage("quotes", testQuotes);
  const todaysQuote = quotes[getDate(new Date())];
  return (
    <div
      css={css`
        text-align: center;
        margin: 0 auto 1.5rem;
        width: 80%;
        border: 5px dashed ${colors.primary};
        color: ${colors.primary};
        @media only screen and (min-width: 700px) {
          width: 50%;
          padding: 0 0.5rem;
        }
      `}
    >
      <h4
        css={css`
          text-transform: uppercase;
          margin: 0.5rem 0;
          font-size: 1.5rem;
        `}
      >
        Quote of the Day
      </h4>
      <p>"{todaysQuote[0]}"</p>
      <p>-{todaysQuote[1]}</p>
    </div>
  );
};

export default QuoteOfTheDay;
