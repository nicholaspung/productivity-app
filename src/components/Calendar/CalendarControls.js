/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";
import { subMonths, addMonths } from "date-fns";

const CalendarControls = ({
  changeMonth,
  changeDate,
  currentMonthAndYear,
  calendarStyles: cs
}) => (
  <div
    css={css`
      display: flex;
      justify-content: center;
    `}
  >
    <div
      css={css`
        flex: ${cs.cellHabitFlex};
        display: flex;
        justify-content: center;
        margin: ${cs.cellMargin};
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
      `}
    >
      <button
        onClick={() => changeMonth(subMonths)}
        css={css`
          background-color: white;
          border: 0;
          cursor: pointer;
          flex: ${cs.cellDayFlex};
          margin: ${cs.cellMargin};
          text-align: center;
          min-width: ${cs.minWidthCell};
          min-height: ${cs.minHeightCell};
        `}
      >
        {"<"}
      </button>
      {currentMonthAndYear}
      <button
        onClick={() => changeMonth(addMonths)}
        css={css`
          background-color: white;
          border: 0;
          cursor: pointer;
          flex: ${cs.cellDayFlex};
          margin: 1px;
          text-align: center;
          min-width: ${cs.minWidthCell};
          min-height: ${cs.minHeightCell};
        `}
      >
        {">"}
      </button>
    </div>
  </div>
);

export default CalendarControls;
