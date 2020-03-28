import React from "react";
import QuoteOfTheDay from "../Reusable/QuoteOfTheDay";

const HOCQuoteOfTheDay = ({ children }) => (
  <React.Fragment>
    <QuoteOfTheDay />
    {children}
  </React.Fragment>
);

export default HOCQuoteOfTheDay;
