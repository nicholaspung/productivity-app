/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";

const CalendarHeader = ({ arrayOfDaysInMonth, calendarStyles: cs }) => (
  <div
    css={css`
      display: flex;
      flex-flow: row nowrap;
    `}
  >
    <div css={cs.calendarHabitCellStyles}>Habits</div>
    <div
      css={css`
        flex: 1;
        flex-flow: row wrap;
        display: flex;
      `}
    >
      {arrayOfDaysInMonth.map(day => (
        <div css={cs.calendarDayCellStyles()} key={day}>
          <h4
            css={css`
              padding: 0;
              margin: 0;
            `}
          >
            {day}
          </h4>
        </div>
      ))}
    </div>
  </div>
);

export default CalendarHeader;
