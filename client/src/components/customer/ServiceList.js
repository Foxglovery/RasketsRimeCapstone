import { useEffect, useRef, useState } from "react";

import "../styles/client/ServiceList.css";
import { AvailableServicesByVenueId, GetServices } from "../managers/serviceManager";
import VenueDropdown from "../dropdowns/VenueDropdown";
export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const serviceRefs = useRef({});

  useEffect(() => {
    if (selectedVenueId)
    {
      AvailableServicesByVenueId(selectedVenueId).then(setServices);
    } else {
      GetServices().then(setServices);
    }
    
  }, [selectedVenueId]);
//auto scrolling to service if url has ref
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#service-', '');
      const element = document.getElementById(`service-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [services]); // Dependency array includes services to re-run when services are updated
 
  const handleVenueChange = (venueId) => {
    setSelectedVenueId(parseInt(venueId));
  };
  return (
    <>
      <div className="venue-background-image">
        <div className="service-header">
          <h1>Our Services</h1>
          <div className="venue-dropdown-container">
                      <VenueDropdown onVenueChange={handleVenueChange} />

          </div>
        </div>
        <div className="cards-container">
          {services.map((s) => (
            <div
              className="blog-card"
              key={s.id}
              id={`service-${s.id}`}
              style={{ backgroundImage: `url(${s.imageUrl})` }}
            >
              <div className="image-overlay"></div>
              <div className="blog-card spring-fever">
                <div className="title-content">
                  <h3>{s.serviceName}</h3>
                  <hr />

                  <div className="intro">{s.description}</div>
                </div>
                <ul className="card-info">
                  {s.venueServices &&
                    s.venueServices.map((vs) => <li key={vs.id}>{vs.venue.venueName}</li>)}
                </ul>
                <div className="utility-info">
                  <ul className="utility-list">
                    <li className="comments">{s.price}</li>
                  </ul>
                </div>
                {/* overlays */}
                <div className="gradient-overlay"></div>
                <div className="color-overlay"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
