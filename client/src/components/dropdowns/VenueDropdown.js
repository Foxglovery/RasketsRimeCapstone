import { useEffect, useState } from "react";
import { GetVenues } from "../managers/venueManager";
import "../styles/dropdowns/VenueDropdown.css";
export default function VenueDropdown({ onVenueChange }) {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    GetVenues().then(setVenues);
  }, []);

  const handleChange = (event) => {
    onVenueChange(event.target.value);
  };

  return (
    <div className="venue-dropdown-container">
      <select onChange={handleChange}>
        <option selected value="0">
          Filter By Venue
        </option>
        {venues.map((v) => (
          <option key={v.id} value={v.id}>
            {v.venueName}
          </option>
        ))}
      </select>
    </div>
  );
}
