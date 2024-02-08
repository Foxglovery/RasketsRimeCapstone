import { useEffect, useState } from "react";
import "../../styles/client/ServiceList.css";
import {
  AvailableServicesByVenueId,
  GetActiveServices,
} from "../managers/serviceManager";
import VenueDropdown from "../dropdowns/VenueDropdown";
import CircleLoader from "react-spinners/CircleLoader";
import withMinimumLoadingTime from "../WithMinimumLoadingTime";
import { Link } from "react-router-dom";

export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (selectedVenueId) {
      withMinimumLoadingTime(AvailableServicesByVenueId(selectedVenueId))
        .then((fetchedServices) => {
          setServices(fetchedServices);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching services by venue");
          setIsLoading(false);
        });
    } else {
      withMinimumLoadingTime(GetActiveServices())
        .then((fetchedServices) => {
          setServices(fetchedServices);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching services");
          setIsLoading(false);
        });
    }
  }, [selectedVenueId]);
  //auto scrolling to service if url has ref
  useEffect(() => {
    //get the hash from the url
    const hash = window.location.hash;
    //if hash is present
    if (hash) {
      //remove the hash header 
      const id = hash.replace("#service-", "");
      //find the element on the page with that id
      const element = document.getElementById(`service-${id}`);
      if (element) {
        //if element was found, then scroll to the element
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [services]); 

  const handleVenueChange = (venueId) => {
    setSelectedVenueId(parseInt(venueId));
  };
  return (
      <div className="dashboard-background">
        <div className="service-header">
          <h1>Our Services</h1>
          <div className="venue-dropdown-container">
            <VenueDropdown onVenueChange={handleVenueChange} />
          </div>
        </div>
        {isLoading ? (
          <div className="service-list-spinner-ctn">
            <CircleLoader loading={isLoading} color="white" size={100} />
          </div>
        ) : (
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
                      s.venueServices.map((vs) => (
                        <li key={vs.id}>
                          <Link
                            className="service-list-links"
                            to={`/venues#venue-${vs.venue.id}`}
                          >
                            {vs.venue.venueName}
                          </Link>
                        </li>
                      ))}
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
        )}
      </div>
  );
}
