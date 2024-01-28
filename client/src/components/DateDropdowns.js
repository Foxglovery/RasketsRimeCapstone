import React, { useState } from 'react';
import './styles/dropdowns/DateDropdown.css'
import { Label } from 'reactstrap';
function DateDropdowns({ loggedInUser, handleDayChange, handleMonthChange, handleYearChange, handleHourChange, currentDay, currentMonth, currentYear, currentHour }) {
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');

    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const startYear = 2023;
    const years = Array.from({ length: 20 }, (_, i) => startYear + i);
    const hours = Array.from({ length: 24 }, (_, i) => i); // For a 24-hour clock

    return (
        <div>
            <div className='dropdown-container'>
                <Label className='create-form-text'>Month</Label>
                <select className='date-dropdown' value={currentMonth} onChange={handleMonthChange}>
                <option value="">Month</option>
                {months.map((m) => (
                    <option key={m} value={m}>
                        {m}
                    </option>
                ))}
            </select>
            </div>
            
            <div className='dropdown-container'>
            <Label className='create-form-text'>Day</Label>
                <select className='date-dropdown' value={currentDay} onChange={handleDayChange}>
                <option value="">Day</option>
                {days.map((d) => (
                    <option key={d} value={d}>
                        {d}
                    </option>
                ))}
            </select>
            </div>
            
            <div className='dropdown-container'>
            <Label className='create-form-text'>Year</Label>
                <select className='date-dropdown' value={currentYear} onChange={handleYearChange}>
                <option value="">Year</option>
                {years.map((y) => (
                    <option key={y} value={y}>
                        {y}
                    </option>
                ))}
            </select>
            </div>
            
            <div className='dropdown-container'>
            <Label className='create-form-text'>Hour</Label>
               <select className='date-dropdown' value={currentHour} onChange={handleHourChange}>
                <option value="">Hour</option>
                {hours.map((h) => (
                    <option key={h} value={h}>
                        {h}
                    </option>
                ))}
            </select> 
            </div>
            
        </div>
    );
}

export default DateDropdowns;
