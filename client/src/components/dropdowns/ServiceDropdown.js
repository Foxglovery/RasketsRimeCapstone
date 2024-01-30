import { useEffect, useState } from "react";

import "../styles/dropdowns/ServiceDropdown.css"
import { GetServices } from "../managers/serviceManager";
export default function ServiceDropdown() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    GetServices().then(setServices);
  }, []);

  return (
    <div className="service-dropdown-container">
        <select>
      <option selected value="0">
        Filter By Service
      </option>
      {services.map(s => (
        <option key={s.id} value={s.id}>{s.serviceName}</option>
      ))}
    </select>

    </div>
    
  );
}
