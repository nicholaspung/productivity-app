/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

import { subMonths, addMonths } from "date-fns";
import { mediaQuery } from "../../constants/styleTheme";

const changeMonthButtonStyles = (styles) => css`
  background-color: white;
  border: 0;
  cursor: pointer;
  flex: ${styles.cellDayFlex};
  margin: ${styles.cellMargin};
  text-align: center;
  min-width: ${styles.minWidthCell};
  min-height: ${styles.minHeightCell};
`;

const CalendarControls = ({
  changeMonth,
  changeDate,
  currentMonthAndYear,
  calendarStyles: cs,
}) => (
  <div
    css={css`
      display: flex;
      justify-content: center;
    `}
  >
    <div
      css={css`
        display: flex;
        justify-content: center;
        margin: ${cs.cellMargin};
        flex: ${cs.cellHabitFlexTiny};
        ${mediaQuery} {
          flex: ${cs.cellHabitFlex};
        }
      `}
    >
      <button
        onClick={changeDate}
        css={css`
          background-color: white;
          border: 1px solid grey;
          cursor: pointer;
        `}
      >
        Today
      </button>
    </div>
    <div
      css={css`
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid grey;
      `}
    >
      <button
        onClick={() => changeMonth(subMonths)}
        css={changeMonthButtonStyles(cs)}
      >
        {"<"}
      </button>
      {currentMonthAndYear}
      <button
        onClick={() => changeMonth(addMonths)}
        css={changeMonthButtonStyles(cs)}
      >
        {">"}
      </button>
    </div>
  </div>
);

export default CalendarControls;
