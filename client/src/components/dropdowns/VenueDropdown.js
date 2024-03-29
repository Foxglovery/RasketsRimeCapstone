import { useEffect, useState } from "react";
import { GetActiveVenues } from "../managers/venueManager";
import "../../styles/dropdowns/VenueDropdown.css";
export default function VenueDropdown({ onVenueChange }) {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    GetActiveVenues().then(setVenues);
  }, []);

  const handleChange = (event) => {
    onVenueChange(event.target.value);
  };

  return (
    <div className="venue-dropdown-container">
      <select onChange={handleChange}>
        <option value="0">All Venues</option>
        {venues.map((v) => (
          <option key={v.id} value={v.id}>
            {v.venueName}
          </option>
        ))}
      </select>
    </div>
  );
}
