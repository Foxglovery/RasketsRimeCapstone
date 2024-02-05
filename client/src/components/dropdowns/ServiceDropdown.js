import { useEffect, useState } from "react";

import "../../styles/dropdowns/ServiceDropdown.css";
import { GetServices } from "../managers/serviceManager";
export default function ServiceDropdown({ onServiceChange }) {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("0");

  const handleChange = (event) => {
    setSelectedService(event.target.value);
    onServiceChange(event.target.value);
    
  };
  useEffect(() => {
    GetServices().then(setServices);
  }, []);

  return (
    <div className="service-dropdown-container">
      <select id="service-dropdown" value={selectedService} onChange={handleChange}>
        <option value="0">
          All Services
        </option>
        {services.map((s) => (
          <option key={s.id} value={s.id}>
            {s.serviceName}
          </option>
        ))}
      </select>
    </div>
  );
}
