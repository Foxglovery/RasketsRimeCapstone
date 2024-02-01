import { useEffect, useState } from "react";
import { GetVenues } from "../managers/venueManager";
import "../styles/client/VenueList.css";
import { Tooltip } from "reactstrap";
export default function VenueList() {
  const [venues, setVenues] = useState([]);
  const [tooltips, setTooltips] = useState({});


  useEffect(() => {
    GetVenues().then(setVenues);
  }, []);

  const toggleTooltip = (id) => {
    setTooltips({...tooltips, [id]: !tooltips[id] });
  }
  return (
    <>
      <div className="venue-background-image">
        <section className="">
          <div className="container py-4">
            <h1 className="h1 text-center" id="pageHeaderTitle">
              Our Venues
            </h1>
            {venues.map((v) => (
              <article key={v.id} className="postcard dark blue">
                <a className="postcard__img_link" href="#">
                  <img
                    className="postcard__img"
                    src={v.imageUrl}
                    alt="Image Title"
                  />
                </a>
                <div className="postcard__text">
                  <h1 className="postcard__title blue">
                    <a href="#">{v.venueName}</a>
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
                        <>
                        <li key={vs.id} className="tag__item play blue">
                          <a href={`/services#service-${vs.service.id}`} id={`Tooltip-${vs.id}`}>
                            <i className="fas fa-play mr-2"></i>
                            {vs.service.serviceName}
                          </a>
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
                      </>
                    ))}
                  </ul>
                  <div className="postcard__subtitle small">
                    <i className="fas fa-calendar-alt mr-2"></i>Have questions?
                    Reach out to <a href="#">{v.contactInfo}</a>
                  </div>
                  <div className="postcard__bar"></div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
