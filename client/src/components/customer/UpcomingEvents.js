import React, { useEffect, useState } from "react";
import {
  GetEventsByServiceId,
  GetEventsByVenueId,
  GetUpcomingEvents,
  UserCancelEvent,
} from "../managers/eventManager";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import VenueDropdown from "../dropdowns/VenueDropdown";
import "../../styles/client/UpcomingEvents.css";
import ServiceDropdown from "../dropdowns/ServiceDropdown";
import CircleLoader from "react-spinners/CircleLoader";
import withMinimumLoadingTime from "../WithMinimumLoadingTime";

export default function UpcomingEvents({ loggedInUser }) {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const [modal, setModal] = useState(false);
  const [activeModalId, setActiveModalId] = useState(null);
  //set up state storage
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [tooltips, setTooltips] = useState({});
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  //tooltip handler
  const toggleTooltip = (id) => {
    setTooltips({ ...tooltips, [id]: !tooltips[id] });
  };
  //handlers for the dropdowns
  const handleVenueChange = (venueId) => {
    setSelectedVenueId(parseInt(venueId));
  };
  const handleServiceChange = (serviceId) => {
    setSelectedServiceId(parseInt(serviceId));
  };
  const toggleModal = () => setModal(!modal);

  //if a venue is selected, fetch based on that
  useEffect(() => {
    if (selectedVenueId) {
      setIsLoading(true);
      withMinimumLoadingTime(GetEventsByVenueId(selectedVenueId)) 
        .then((fetchedEvents) => {
          setEvents(fetchedEvents);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the events by venue",
            error
          );
          setIsLoading(false);
        });
      //otherwise get all upcoming
    } else {
      setIsLoading(true);
      withMinimumLoadingTime(GetUpcomingEvents()) 
        .then((fetchedEvents) => {
          setEvents(fetchedEvents);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching upcoming events", error);
          setIsLoading(false);
        });
    }
  }, [selectedVenueId, refetchTrigger]);
  //rinse and repeat for service
  useEffect(() => {
    if (selectedServiceId) {
      setIsLoading(true);
      withMinimumLoadingTime(GetEventsByServiceId(selectedServiceId)) 
        .then((fetchedEvents) => {
          setEvents(fetchedEvents);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching events by Service", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      withMinimumLoadingTime(GetUpcomingEvents()) 
        .then((fetchedEvents) => {
          setEvents(fetchedEvents);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching", error);
          setIsLoading(false);
        });
    }
  }, [selectedServiceId, refetchTrigger]);

  const openModal = (eventId) => {
    setActiveModalId(eventId);
  };
  const closeModal = () => {
    setActiveModalId(null);
  };
  //formating for the date portion of card
  const formatEventTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };
  const formatEventEnd = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleTimeString()}`;
  };

  const handleUserCancel = async (eventId) => {
    try {
      await UserCancelEvent(eventId, loggedInUser.id);
      //reset fetch upon cancel
      setRefetchTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("There was an error canceling the event:", error);
    } finally {
      closeModal();
    }
  };
  return (
    <div className="dashboard-background">
      <section className="">
        <div className="container py-4">
          <div className="upcoming-header-container">
            <VenueDropdown onVenueChange={handleVenueChange} />
            <h1 className="h1 text-center" id="pageHeaderTitle">
              Upcoming Events
            </h1>
            <ServiceDropdown onServiceChange={handleServiceChange} />
          </div>
          <div>
            
          </div>
          {isLoading ? (
            <div className="upcoming-spinner-ctn">
               <CircleLoader loading={isLoading} color="white" size={100} />
            </div>
           
          ) : events.length > 0 ? (
            events.map((me) => (
              <article key={me.id} className="postcard dark blue">
                <a className="postcard__img_link" href="#">
                  <img
                    className="postcard__img"
                    src={me.venue.imageUrl}
                    alt="A picture of a place"
                  />
                </a>
                <div className="postcard__text">
                  <h1 className="postcard__title blue">
                    <a href="#">{me.eventName}</a>
                  </h1>
                  <h3 className="postcard-my-venue-text">
                    @ {me.venue.venueName}
                  </h3>
                  <div className="upcoming-small-details">
                    <div className="upcoming-details-cont">
                      <div className="postcard__subtitle small">
                        <i className="fas fa-calendar-alt mr-2"></i>
                        {me.venue.address}
                      </div>
                      <div className="postcard__subtitle small">
                        <i className="fas fa-calendar-alt mr-2"></i>
                        {formatEventTime(me.eventStart)}
                      </div>
                    </div>

                    <div className="upcoming-details-cont">
                      <div className="postcard__subtitle small">
                        <i className="fas fa-calendar-alt mr-2"></i>
                        {me.expectedAttendees} People Expected
                      </div>
                      <div className="postcard__subtitle small">
                        <i className="fas fa-calendar-alt mr-2"></i>
                        Until {formatEventEnd(me.eventEnd)}
                      </div>
                    </div>
                  </div>

                  <div className="postcard__bar"></div>
                  <div className="postcard__preview-txt">
                    {me.eventDescription}
                  </div>
                  <ul className="postcard__tagbox">
                    {me.eventServices.map((ev) => (
                      <React.Fragment key={ev.id}>
                        <li key={ev.id} className="tag__item play blue">
                          <a
                            href={`/services#service-${ev.service.id}`}
                            id={`Tooltip-${ev.id}`}
                          >
                            <i className="fas fa-play mr-2"></i>
                            {ev.service.serviceName}
                          </a>
                        </li>
                        <Tooltip
                          placement="bottom"
                          isOpen={tooltips[`Tooltip-${ev.id}`]}
                          target={`Tooltip-${ev.id}`}
                          toggle={() => toggleTooltip(`Tooltip-${ev.id}`)}
                        >
                          {ev.service.description}{" "}
                        </Tooltip>
                      </React.Fragment>
                    ))}
                  </ul>
                  <div className="postcard__subtitle small">
                    <i className="fas fa-calendar-alt mr-2"></i>Have questions?
                    Reach out to <a href="#">{me.venue.contactInfo}</a>
                  </div>
                  <div className="postcard__bar"></div>
                  {loggedInUser.id === me.userId && (
                    <div className="my-events-btn-container">
                      <Button
                        className="my-events-btn"
                        onClick={() => navigate(`/events/update/${me.id}`)}
                      >
                        Update Event
                      </Button>
                      <Button
                        className="my-events-btn"
                        onClick={() => openModal(me.id)}
                      >
                        Cancel Event
                      </Button>
                    </div>
                  )}
                  <Modal isOpen={activeModalId === me.id} toggle={closeModal}>
                    <ModalHeader toggle={toggleModal}>Cancel Event</ModalHeader>
                    <ModalBody>Are you sure you wish to cancel?</ModalBody>
                    <ModalFooter>
                      <Button
                        color="danger"
                        onClick={() => handleUserCancel(me.id)}
                      >
                        Yes, Cancel
                      </Button>{" "}
                      <Button color="secondary" onClick={toggleModal}>
                        No
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </article>
            ))
          ) : (
            <div className="no-events-center">
              <div className="no-events-container">
                <p className="no-events-message">
                  No events found for the selected criteria.
                </p>
              </div>
            </div>
          )} 
        </div>
      </section>
    </div>
  );
}
