import React, { useEffect, useState } from "react";
import { GetEventsByUserId, UserCancelEvent } from "../managers/eventManager";
import "../styles/client/MyEventsList.css";
import { Button, Tooltip } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function MyEventsList({ loggedInUser }) {
  const navigate = useNavigate();
  const [myEvents, setMyEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeModalId, setActiveModalId] = useState(null);
  const [tooltips, setTooltips] = useState({});
  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    GetEventsByUserId(loggedInUser.id).then(setMyEvents);
  }, []);

  //tooltip handler
  const toggleTooltip = (id) => {
    setTooltips({...tooltips, [id]: !tooltips[id] });
  }

  const openModal = (eventId) => {
    setActiveModalId(eventId);
  };
  const closeModal = () => {
    setActiveModalId(null);
  };

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

      const updatedEvents = await GetEventsByUserId(loggedInUser.id);
      setMyEvents(updatedEvents);
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
          <h1 className="h1 text-center" id="pageHeaderTitle">
            My Events
          </h1>
          {/* make sure my events contains an array for if admin has no submitted events*/}
          {Array.isArray(myEvents) &&
            myEvents.map((me) => (
              <article key={me.id} className="postcard dark blue">
                <a className="postcard__img_link" href="#">
                  <img
                    className="postcard__img"
                    src={me.venue.imageUrl}
                    alt="A picture of a place"
                  />
                </a>
                <div className="postcard__text my-events-details">
                  <h1 className="postcard__title blue">
                    <a href="#">{me.eventName}</a>
                  </h1>
                  <h3 className="postcard-my-venue-text">
                    @ {me.venue.venueName}
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
                          <a href="#" id={`Tooltip-${ev.id}`}>
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
                  {loggedInUser.id == me.userId && (
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
                        onClick={() => {
                          handleUserCancel(me.id);
                        }}
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
            ))}
        </div>
      </section>
    </div>
  );
}
