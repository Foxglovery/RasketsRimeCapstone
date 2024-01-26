// DurationDropdown.js
import React, { useState } from 'react';

function DurationDropdown({ loggedInUser, onChange }) {
    const durationOptions = Array.from({ length: 8 }, (_, i) => {
        const hour = i + 1; // Starting from 1 hour
        return {
            value: hour,
            label: hour === 1 ? '1 hour' : `${hour} hours`
        };
    });

    const [selectedDuration, setSelectedDuration] = useState(durationOptions[0].value);

    const handleChange = (e) => {
        const newDuration = e.target.value;
        setSelectedDuration(newDuration);
        if (onChange) {
            onChange(newDuration);
        }
    };

    return (
        <select value={selectedDuration} onChange={handleChange}>
            {durationOptions.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default DurationDropdown;
