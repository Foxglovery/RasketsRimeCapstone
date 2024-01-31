// DurationDropdown.js
import React, { useState } from "react";
import { Label } from "reactstrap";

function DurationDropdown({ loggedInUser, onChange }) {
  const durationOptions = Array.from({ length: 8 }, (_, i) => {
    const hour = i + 1; // Starting from 1 hour
    return {
      value: hour,
      label: hour === 1 ? "1 hour" : `${hour} hours`,
    };
  });

  const [selectedDuration, setSelectedDuration] = useState(
    durationOptions[0].value
  );

  const handleChange = (e) => {
    const newDuration = e.target.value;
    setSelectedDuration(newDuration);
    if (onChange) {
      onChange(newDuration);
    }
  };

  return (
    <>
      <div className="duration-dropdown-container">
        <Label for="duration" className="create-form-text">
          Duration
        </Label>
        <select
          value={selectedDuration}
          onChange={handleChange}
          className="duration-dropdown"
        >
          {durationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default DurationDropdown;
