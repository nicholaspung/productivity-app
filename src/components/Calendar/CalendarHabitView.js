/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React from "react";
import { getSpecificDate } from "../../utilities";

const CalendarHabitView = ({
  habits,
  arrayOfDaysInMonth,
  calendarStyles: cs
}) => (
  <>
    {habits.map(habit => (
      <div
        css={css`
          display: flex;
          flex-flow: row nowrap;
        `}
        key={habit.name}
      >
        <div
          css={[
            cs.calendarHabitCellStyles,
            css`
              font-weight: normal;
            `
          ]}
        >
          {habit.name.length > 24
            ? `${habit.name.slice(0, 25)}...`
            : `${habit.name}`}
        </div>
        <div
          css={css`
            flex: 1;
            flex-flow: row wrap;
            display: flex;
          `}
        >
          {arrayOfDaysInMonth().map(day => (
            <div css={cs.calendarDayCellStyles} key={day}>
              <div
                css={css`
                  background-color: ${habit.dates.find(
                    date => Number(getSpecificDate(date)) === day
                  )
                    ? "lightgreen"
                    : "white"};
                  min-width: ${cs.minWidthCell};
                  min-height: ${cs.minHeightCell};
                `}
              />
              {/* if dates.includes(day) background-color: lightblue, else background-color: white */}
            </div>
          ))}
        </div>
      </div>
    ))}
  </>
);

export default CalendarHabitView;
