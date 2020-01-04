import React, { useState, useEffect } from "react";
import {
  getMonth,
  getYear,
  subMonths,
  addMonths,
  getDaysInMonth,
  startOfMonth,
  getDay,
  endOfMonth
} from "date-fns";
import Day from "./Day";

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const Calendar = () => {
  const [day, setDay] = useState(new Date());
  const [month, setMonth] = useState(getMonth(day));
  const [year, setYear] = useState(getYear(day));
  const [monthArray, setMonthArray] = useState([]);

  useEffect(() => {
    setMonthArray(calendarWeekArray(day));
  }, [day]);

  const changeMonth = direction => {
    let toDay, toMonth, toYear;
    switch (direction) {
      case "left":
        toDay = subMonths(day, 1);
        month - 1 < 0 ? (toMonth = 11) : (toMonth = month - 1);
        toYear = getYear(toDay);
        break;
      case "right":
        toDay = addMonths(day, 1);
        month + 1 > 11 ? (toMonth = 0) : (toMonth = month + 1);
        toYear = getYear(toDay);
        break;
      case "current":
        toDay = new Date();
        toMonth = getMonth(toDay);
        toYear = getYear(toDay);
        break;
      default:
        break;
    }
    setDay(toDay);
    setMonth(toMonth);
    setYear(toYear);
  };

  const calendarWeekArray = date => {
    const daysInMonth = getDaysInMonth(date);
    const startOfMonthDate = startOfMonth(date);
    const startOfMonthIndex = getDay(startOfMonthDate);
    const endOfMonthDate = endOfMonth(date);
    const endOfMonthIndex = getDay(endOfMonthDate);

    // Creates initial array with days and placeholders
    let days = [];
    for (let i = 0; i < startOfMonthIndex; i += 1) {
      days.push(" ");
    }
    for (let j = 1; j <= daysInMonth; j += 1) {
      days.push(j);
    }
    for (let k = 0; k < 6 - endOfMonthIndex; k += 1) {
      days.push(" ");
    }

    // Separates initial array into parts of 7 days
    let month = [];
    for (let a = 0; a < days.length / 7; a += 1) {
      let week = [];
      let start = a * 7;
      for (let b = start; b < start + 7; b += 1) {
        week.push(days[b]);
      }
      month.push(week);
    }

    return month;
  };

  return (
    <table>
      <thead>
        <tr>
          <th colSpan="7">
            {monthNames[month]} {year}
          </th>
        </tr>
        <tr>
          <th>
            <button onClick={() => changeMonth("left")}>{"<"}</button>
          </th>
          <th colSpan="5">
            <button onClick={() => changeMonth("current")}>Today</button>
          </th>

          <th>
            <button onClick={() => changeMonth("right")}>{">"}</button>
          </th>
        </tr>
        <tr>
          {dayNames.map(day => (
            <td key={day}>{day}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {monthArray.map((week, i) => (
          <tr key={i}>
            {week.map((day, i) => (
              <Day day={day} key={i} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Calendar;
