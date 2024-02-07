import React, { useEffect, useState } from "react";
import {
  GetActiveVenues,
  GetVenuesByServiceId,
} from "../managers/venueManager";
import "../../styles/client/VenueList.css";
import { Tooltip } from "reactstrap";
import CircleLoader from "react-spinners/CircleLoader";
import withMinimumLoadingTime from "../WithMinimumLoadingTime";
import ServiceDropdown from "../dropdowns/ServiceDropdown";
import { Link } from "react-router-dom";

export default function VenueList() {
  const [venues, setVenues] = useState([]);
  const [tooltips, setTooltips] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  useEffect(() => {
    if (selectedServiceId) {
      setIsLoading(true);
      withMinimumLoadingTime(GetVenuesByServiceId(selectedServiceId))
        .then((fetchedVenues) => {
          setVenues(fetchedVenues);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the venues by service",
            error
          );
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      withMinimumLoadingTime(GetActiveVenues())
        .then((fetchedVenues) => {
          setVenues(fetchedVenues);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching venues");
          setIsLoading(false);
        });
    }
  }, [selectedServiceId]);

  //for to auto-scroll to resource specified in url
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#venue-", "");
      const element = document.getElementById(`venue-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [venues]);

  const handleServiceChange = (serviceId) => {
    setSelectedServiceId(parseInt(serviceId));
  };
  const toggleTooltip = (id) => {
    setTooltips({ ...tooltips, [id]: !tooltips[id] });
  };
  return (
    <div className="dashboard-background">
      <section className="">
        <div className="container py-4">
          <h1 className="h1 text-center" id="pageHeaderTitle">
            Our Venues
          </h1>
          <div className="venue-list-service-drop-ctn">
            <ServiceDropdown onServiceChange={handleServiceChange} />
          </div>
          {isLoading ? (
            <div className="venue-list-spinner-ctn">
              <CircleLoader loading={isLoading} color="white" size={100} />
            </div>
          ) : (
            venues.map((v) => (
              // id ties into the hash reference
              <article
                id={`venue-${v.id}`}
                key={v.id}
                className="postcard dark blue"
              >
                <span className="postcard__img_link" href="#">
                  <img
                    className="postcard__img"
                    src={v.imageUrl}
                    alt="a venue"
                  />
                </span>
                <div className="postcard__text">
                  <h1 className="postcard__title blue">
                    <span>{v.venueName}</span>
                  </h1>
                  <div className="postcard__subtitle small">
                    <i className="fas fa-calendar-alt mr-2"></i>
                    {v.address}
                  </div>
                  <div className="postcard__bar"></div>
                  <div className="postcard__preview-txt">{v.description}</div>
                  <ul className="postcard__tagbox">
                    {v.venueServices &&
                      v.venueServices.map((vs) => (
                        <React.Fragment key={vs.id}>
                          <li key={vs.id} className="tag__item play blue">
                            <Link
                              to={`/services#service-${vs.service.id}`}
                              id={`Tooltip-${vs.id}`}
                            >
                              <i className="fas fa-play mr-2"></i>
                              {vs.service.serviceName}
                            </Link>
                          </li>
                          <Tooltip
                            placement="bottom"
                            isOpen={tooltips[`Tooltip-${vs.id}`]}
                            target={`Tooltip-${vs.id}`}
                            toggle={() => toggleTooltip(`Tooltip-${vs.id}`)}
                          >
                            {vs.service.description}{" "}
                            {/* Assuming you have a description field */}
                          </Tooltip>
                        </React.Fragment>
                      ))}
                  </ul>
                  <div className="postcard__subtitle small">
                    <i className="fas fa-calendar-alt mr-2"></i>Have questions?
                    Reach out to {v.contactInfo}
                  </div>
                  <div className="postcard__bar"></div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
