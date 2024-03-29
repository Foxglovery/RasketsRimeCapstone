import React, { useEffect, useState } from "react";
import { GetEventsByUserId, UserCancelEvent } from "../managers/eventManager";
import "../../styles/client/MyEventsList.css";
import { Button, Tooltip } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CircleLoader from "react-spinners/CircleLoader";
import withMinimumLoadingTime from "../WithMinimumLoadingTime";

export default function MyEventsList({ loggedInUser }) {
  const navigate = useNavigate();
  const [myEvents, setMyEvents] = useState([]);
  const [activeModalId, setActiveModalId] = useState(null);
  const [tooltips, setTooltips] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    withMinimumLoadingTime(GetEventsByUserId(loggedInUser.id))
      .then((fetchedEvents) => {
        setMyEvents(fetchedEvents);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching my events");
      });
  }, [loggedInUser.id]);

  //tooltip handler toggles between true and false (open and closed) copying and extending state of tooltips
  const toggleTooltip = (id) => {
    setTooltips({ ...tooltips, [id]: !tooltips[id] });
  };

  const openModal = (eventId) => {
    setActiveModalId(eventId);
  };
  const closeModal = () => {
    setActiveModalId(null);
  };

  //date time formatting
  const formatEventTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };
  const formatEventEnd = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleTimeString()}`;
  };

  //async to wait for cancellation to complete before refetching or throwing error, then closing modal
  const handleUserCancel = async (eventId) => {
    try {
      await UserCancelEvent(eventId, loggedInUser.id);

      const updatedEvents = await GetEventsByUserId(loggedInUser.id);
      setMyEvents(updatedEvents);
    } catch (error) {
      console.error("There was an error canceling the event:", error);
    } finally {
      //use finally here to close the modal
      closeModal();
    }
  };

  return (
    <div className="dashboard-background">
      <section>
        <div className="container py-4">
          <h1 className="h1 text-center" id="pageHeaderTitle">
            My Events
          </h1>
          {isLoading ? (
            <div className="my-events-spinner-ctn">
              <CircleLoader loading={isLoading} color="white" size={100} />
            </div>
          ) : (
            <>
              {myEvents && myEvents.length > 0 ? (
                myEvents.map((me) => (
                  <article key={me.id} className="postcard dark blue">
                    <Link
                      className="postcard__img_link"
                      to={`/venues#venue-${me.venue.id}`}
                    >
                      <img
                        className="postcard__img"
                        src={me.venue.imageUrl}
                        alt="Venue"
                      />
                    </Link>
                    <div className="postcard__text my-events-details">
                      <h1 className="postcard__title blue">
                        <span>{me.eventName}</span>
                      </h1>
                      <h3 className="postcard-my-venue-text">
                        <span>@ </span>
                        <Link
                          className="upcoming-venue-link"
                          to={`/venues#venue-${me.venue.id}`}
                        >
                          {me.venue.venueName}
                        </Link>
                      </h3>
                      <div className="postcard__subtitle small">
                        <i className="fas fa-calendar-alt mr-2"></i>
                        {me.status}
                      </div>
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
                            <i className="fas fa-calendar-alt mr-2"></i>Until{" "}
                            {formatEventEnd(me.eventEnd)}
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
                            <li className="tag__item play blue">
                              <Link
                                to={`/services#service-${ev.service.id}`}
                                id={`Tooltip-${ev.id}`}
                              >
                                <i className="fas fa-play mr-2"></i>
                                {ev.service.serviceName}
                              </Link>
                              <Tooltip
                                placement="bottom"
                                isOpen={tooltips[`Tooltip-${ev.id}`]}
                                target={`Tooltip-${ev.id}`}
                                toggle={() => toggleTooltip(`Tooltip-${ev.id}`)}
                              >
                                {ev.service.description}{" "}
                              </Tooltip>
                            </li>
                          </React.Fragment>
                        ))}
                      </ul>
                      <div className="postcard__subtitle small">
                        <i className="fas fa-calendar-alt mr-2"></i>Have
                        questions? Reach out to{" "}
                        <span>{me.venue.contactInfo}</span>
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
                      <Modal
                        isOpen={activeModalId === me.id}
                        toggle={closeModal}
                      >
                        <ModalHeader toggle={closeModal}>
                          Cancel Event
                        </ModalHeader>
                        <ModalBody>Are you sure you wish to cancel?</ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            onClick={() => handleUserCancel(me.id)}
                          >
                            Yes, Cancel
                          </Button>
                          <Button color="secondary" onClick={closeModal}>
                            No
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </div>
                  </article>
                ))
              ) : (
                <div className="no-events-message">
                  <p>You have not submitted any events. Start adding some <Link className="my-events-link" to={`/events/create`}>here!</Link></p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
