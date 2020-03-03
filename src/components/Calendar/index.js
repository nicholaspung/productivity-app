/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { getDaysInMonth, getMonth, getYear } from "date-fns";

import CalendarControls from "./CalendarControls";
import CalendarHeader from "./CalendarHeader";
import CalendarHabitView from "./CalendarHabitView";
import { withFirebase } from "../../contexts/Firebase";
import {
  collectIdsAndDocsFirebase,
  getSelectedMonth,
  changeDatesToHabitsArray
} from "../../utilities";

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
];

const cellMargin = "2px";
const cellDayFlex = "0 0 2.75%";
const cellHabitFlex = "0 0 201px";
const minWidthCell = "25px";
const minHeightCell = "25px";

const calendarDayCellStyles = css`
  border: 1px solid grey;
  margin: ${cellMargin};
  flex: ${cellDayFlex};
  text-align: center;
  min-width: ${minWidthCell};
  min-height: ${minHeightCell};
`;

const calendarHabitCellStyles = css`
  border: 1px solid grey;
  margin: ${cellMargin};
  flex: ${cellHabitFlex};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Calendar = ({ firebase, authUser }) => {
  const [today] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(today);
  const [currentMonthAndYear, setCurrentMonthAndYear] = useState(
    `${MONTHS[getMonth(currentDate)]} ${getYear(currentDate)}`
  );
  const [habits, setHabits] = useState([]);

  const arrayOfDaysInMonth = () => {
    let arr = [];
    {
      let i = 1;
      while (i <= getDaysInMonth(currentDate)) {
        arr.push(i);
        i += 1;
      }
    }
    return arr;
  };

  const changeMonth = operator => {
    let nextMonth = operator(currentDate, 1);
    setCurrentDate(nextMonth);
    setCurrentMonthAndYear(
      `${MONTHS[getMonth(nextMonth)]} ${getYear(nextMonth)}`
    );
  };

  const changeDate = () => {
    setCurrentDate(today);
    setCurrentMonthAndYear(`${MONTHS[getMonth(today)]} ${getYear(today)}`);
  };

  useEffect(() => {
    const unsubscribe = firebase
      .dates()
      .where("user", "==", authUser.uid)
      .onSnapshot(snapshot => {
        if (!snapshot.empty) {
          let days = snapshot.docs.map(collectIdsAndDocsFirebase);
          let filteredDays = days.filter(day =>
            day.date.includes(getSelectedMonth(currentDate))
          );

          setHabits(changeDatesToHabitsArray(filteredDays));
        }
      });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, [currentDate]);

  return (
    <>
      <h1
        css={css`
          text-align: center;
          margin: 0;
          text-decoration: underline;
        `}
      >
        Calendar
      </h1>
      <CalendarControls
        changeMonth={changeMonth}
        changeDate={changeDate}
        currentMonthAndYear={currentMonthAndYear}
        calendarStyles={{
          cellMargin,
          cellDayFlex,
          cellHabitFlex,
          minWidthCell,
          minHeightCell
        }}
      />
      <CalendarHeader
        arrayOfDaysInMonth={arrayOfDaysInMonth}
        calendarStyles={{ calendarHabitCellStyles, calendarDayCellStyles }}
      />
      <CalendarHabitView
        habits={habits}
        arrayOfDaysInMonth={arrayOfDaysInMonth}
        calendarStyles={{
          calendarHabitCellStyles,
          calendarDayCellStyles,
          minWidthCell,
          minHeightCell
        }}
      />
    </>
  );
};

export default withFirebase(Calendar);
