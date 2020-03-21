/** @jsx jsx */
import { jsx, css } from "@emotion/core";
// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { getDaysInMonth, getMonth, getYear, getDate, format } from "date-fns";

import CalendarControls from "./CalendarControls";
import CalendarHeader from "./CalendarHeader";
import CalendarHabitView from "./CalendarHabitView";
import { withFirebase } from "../../contexts/Firebase";
import {
  collectIdsAndDocsFirebase,
  getSelectedMonth,
  changeDatesToHabitsArray
} from "../../utilities";
import useLocalStorage from "../../hooks/useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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

const calendarDayCellStyles = (conditional = false) => css`
  border: ${conditional ? "1px solid white" : "1px solid grey"};
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

const iconStyles = css`
  padding: 0 0.5rem 0 0.25rem;
`;

const getArrayOfDaysInMonth = (today, currentDate, placement) => {
  let arr = [];
  {
    let i = 1;
    while (
      i <=
      (format(today, "yyyy-MM-dd") !== format(currentDate, "yyyy-MM-dd") ||
      placement
        ? getDaysInMonth(currentDate)
        : getDate(currentDate))
    ) {
      arr.push(i);
      i += 1;
    }
  }
  return arr;
};

const Calendar = ({ firebase, authUser }) => {
  const [today] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(today);
  const [currentMonthAndYear, setCurrentMonthAndYear] = useState(
    `${MONTHS[getMonth(currentDate)]} ${getYear(currentDate)}`
  );
  const [habits, setHabits] = useState([]);
  const [arrayOfDaysInMonthHeader, setArrayOfDaysInMonthHeader] = useState(
    getArrayOfDaysInMonth(today, currentDate, "headers")
  );
  const [arrayOfDaysInMonth, setArrayOfDaysInMonth] = useState(
    getArrayOfDaysInMonth(today, currentDate)
  );
  const [showCalendar, setShowCalendar] = useLocalStorage(
    "calendarDisplay",
    false
  );

  const toggleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  useEffect(() => {
    setArrayOfDaysInMonth(getArrayOfDaysInMonth(today, currentDate));
    setArrayOfDaysInMonthHeader(
      getArrayOfDaysInMonth(today, currentDate, "headers")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

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
      <div
        css={css`
          display: flex;
        `}
      >
        <h1
          css={css`
            text-align: center;
            margin: 0;
            text-decoration: underline;
            flex: 1;
          `}
        >
          Calendar
        </h1>
        <button
          onClick={toggleShowCalendar}
          css={css`
            background: black;
            border: 0;
            margin: 0.25rem 0;
            color: white;
            padding-right: 0.5rem;
            cursor: pointer;
          `}
        >
          {showCalendar ? (
            <>
              <FontAwesomeIcon icon={faEyeSlash} css={iconStyles} />
              Hide Calendar
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faEye} css={iconStyles} />
              Show Calendar
            </>
          )}
        </button>
      </div>
      {showCalendar && (
        <>
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
            arrayOfDaysInMonth={arrayOfDaysInMonthHeader}
            calendarStyles={{ calendarHabitCellStyles, calendarDayCellStyles }}
          />
          <CalendarHabitView
            months={MONTHS}
            currentMonth={currentMonthAndYear.slice(0, 3)}
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
      )}
    </>
  );
};

export default withFirebase(Calendar);
