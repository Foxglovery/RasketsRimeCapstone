import React from "react";
import "../styles/dropdowns/DateDropdown.css";
import { Label } from "reactstrap";
export default function DateDropdowns({
  loggedInUser,
  handleDayChange,
  handleMonthChange,
  handleYearChange,
  handleHourChange,
  currentDay,
  currentMonth,
  currentYear,
  currentHour,
}) {
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
    "December",
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const startYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => startYear + i);
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12; // Convert 24-hr to 12-hr format
    const suffix = i < 12 ? "AM" : "PM"; // is the time selected AM or PM?
    return `${hour}:00 ${suffix}`; // Concat hour with suffix
  });

  return (
    <div className="date-dropdown-wrapper">
      <div className="date-dropdown-row">
        <div className="dropdown-container">
          <Label className="create-form-text">Month</Label>
          <select
            className="date-dropdown"
            value={currentMonth}
            onChange={handleMonthChange}
          >
            {monthNames.map((name, index) => (
              <option key={name} value={index + 1}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown-container">
          <Label className="create-form-text">Day</Label>
          <select
            className="date-dropdown"
            value={currentDay}
            onChange={handleDayChange}
          >
            <option value="">Day</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="date-dropdown-row">
        <div className="dropdown-container">
          <Label className="create-form-text">Year</Label>
          <select
            className="date-dropdown"
            value={currentYear}
            onChange={handleYearChange}
          >
            <option value="">Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown-container">
          <Label className="create-form-text">Hour</Label>
          <select
            className="date-dropdown"
            value={currentHour}
            onChange={handleHourChange}
          >
            {hours.map((hour, index) => (
              <option key={index} value={index}>
                {hour}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
