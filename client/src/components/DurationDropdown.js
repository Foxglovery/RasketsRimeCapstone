import React, { useState } from "react";
import { Label } from "reactstrap";

export default function DurationDropdown({ loggedInUser, onChange }) {
  const durationOptions = Array.from({ length: 8 }, (_, i) => {
    const hour = i + 1; // adjusted for 0 indexed array
    return {
      value: hour,
      label: hour === 1 ? "1 hour" : `${hour} hours`, //account for singular/plural
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
  );
}
