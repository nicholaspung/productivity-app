/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";
import { getDay } from "date-fns";
import useLocalStorage from "../../hooks/useLocalStorage";
import { colors } from "../../constants/styleTheme";

const testQuotes = [
  "list",
  "of",
  "quotes",
  "this",
  "is",
  "a",
  "placeholder",
  "i",
  "need",
  "more",
  "placeholding",
  "words",
  "this",
  "this",
  "can",
  "work",
  "better",
  "i wonder",
  "if",
  "this will",
  "be",
  "enough",
  "no it",
  "is not",
  "enough for",
  "now",
  "so spanning",
  "a lot",
  "more"
];

const QuoteOfTheDay = () => {
  const [quotes] = useLocalStorage("quotes", testQuotes);
  const todaysQuote = quotes[getDay(new Date())];
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
      <p>{todaysQuote}</p>
    </div>
  );
};

export default QuoteOfTheDay;
