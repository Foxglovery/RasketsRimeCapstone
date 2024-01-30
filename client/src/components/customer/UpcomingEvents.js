import { useEffect, useState } from "react"
import { GetEventsByServiceId, GetEventsByUserId, GetEventsByVenueId, GetUpcomingEvents, UserCancelEvent } from "../managers/eventManager";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";
import VenueDropdown from "../dropdowns/VenueDropdown";
import "../styles/client/UpcomingEvents.css"
import ServiceDropdown from "../dropdowns/ServiceDropdown";

export default function UpcomingEvents({ loggedInUser }) {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    
    const [modal, setModal] = useState(false);
    const [activeModalId, setActiveModalId] = useState(null);
    //set up state storage
    const [selectedVenueId, setSelectedVenueId] = useState(null);
    const [selectedServiceId, setSelectedServiceId] = useState(null);

    //change handlers to be passed to dropdowns
    const handleVenueChange = (venueId) => {
        setSelectedVenueId(parseInt(venueId));
    }
    const handleServiceChange = (serviceId) => {
        setSelectedServiceId(parseInt(serviceId));
    }
    const toggleModal = () => setModal(!modal);

    useEffect(() => {
        if (selectedVenueId) {
            GetEventsByVenueId(selectedVenueId)
                .then(fetchedEvents => {
                    setEvents(fetchedEvents);
                })
                .catch(error => {
                    console.error("There was an error fetching the events by venue", error)
                });
        } else {
            GetUpcomingEvents()
                .then(fetchedEvents => {
                    setEvents(fetchedEvents);
                })
                .catch(error => {
                    console.error("There was an error fetching upcoming events", error)
                })
        }
    }, [selectedVenueId])

    useEffect(() => {
        if (selectedServiceId) {
            GetEventsByServiceId(selectedServiceId)
                .then(fetchedEvents => {
                    setEvents(fetchedEvents);
                })
                .catch(error => {
                    console.error("There was an error fetching events by Service", error)
                })
        } else {
            GetUpcomingEvents()
                .then(fetchedEvents => {
                    setEvents(fetchedEvents);
                })
                .catch(error => {
                    console.error("There was an error fetching", error)
                })
        }
    },[selectedServiceId])

    

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
      }
    
      const handleUserCancel = async (eventId) => {
        try {
            await UserCancelEvent(eventId, loggedInUser.id);
    
            const updatedEvents = await GetEventsByUserId(loggedInUser.id);
            setEvents(updatedEvents);
        } catch (error) {
            console.error("There was an error canceling the event:", error);
            
        } finally {
            closeModal();
        }
      };
      return (
        <div className="background-image">
            <section className="">
                <div className="container py-4">
                    <div className="upcoming-header-container">
                        <VenueDropdown onVenueChange={handleVenueChange}/>
                        <h1 className="h1 text-center" id="pageHeaderTitle">Upcoming Events</h1>
                        <ServiceDropdown onServiceChange={handleServiceChange}/>
                    </div>
    
                    {events.length > 0 ? (
                        events.map((me) => (
                            <article key={me.id} className="postcard dark blue">
                                <a className="postcard__img_link" href="#">
                                    <img className="postcard__img" src={me.venue.imageUrl} alt="A picture of a place" />
                                </a>
                                <div className="postcard__text">
                                    <h1 className="postcard__title blue"><a href="#">{me.eventName}</a></h1>
                                    <h3 className="postcard-my-venue-text">@ {me.venue.venueName}</h3>
                                    <div className="postcard__subtitle small">
                                        <i className="fas fa-calendar-alt mr-2"></i>{me.status}
                                    </div>
                                    <div className="postcard__subtitle small">
                                        <i className="fas fa-calendar-alt mr-2"></i>{me.venue.address}
                                    </div>
                                    <div className="postcard__subtitle small">
                                        <i className="fas fa-calendar-alt mr-2"></i>{formatEventTime(me.eventStart)}
                                    </div>
                                    <div className="postcard__subtitle small">
                                        <i className="fas fa-calendar-alt mr-2"></i>Until {formatEventEnd(me.eventEnd)}
                                    </div>
                                    <div className="postcard__subtitle small">
                                        <i className="fas fa-calendar-alt mr-2"></i>{me.expectedAttendees} People Expected
                                    </div>
                                    <div className="postcard__bar"></div>
                                    <div className="postcard__preview-txt">{me.eventDescription}</div>
                                    <ul className="postcard__tagbox">
                                        {me.eventServices.map((ev) => (
                                            <li key={ev.id} className="tag__item play blue">
                                                <a href="#"><i className="fas fa-play mr-2"></i>{ev.service.serviceName}</a>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="postcard__subtitle small">
                                        <i className="fas fa-calendar-alt mr-2"></i>Have questions? Reach out to <a href="#">{me.venue.contactInfo}</a>
                                    </div>
                                    <div className="postcard__bar"></div>
                                    {loggedInUser.id == me.userId && (
                                        <div className="my-events-btn-container">
                                            <Button className="my-events-btn" onClick={() => navigate(`/events/update/${me.id}`)}>Update Event</Button>
                                            <Button className="my-events-btn" onClick={() => openModal(me.id)}>Cancel Event</Button>
                                        </div>
                                    )}
                                    <Modal isOpen={activeModalId === me.id} toggle={closeModal}>
                                        <ModalHeader toggle={toggleModal}>Cancel Event</ModalHeader>
                                        <ModalBody>Are you sure you wish to cancel?</ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" onClick={() => handleUserCancel(me.id)}>Yes, Cancel</Button>{" "}
                                            <Button color="secondary" onClick={toggleModal}>No</Button>
                                        </ModalFooter>
                                    </Modal>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="no-events-center">
<div className="no-events-container">
                            <p className="no-events-message">No events found for the selected criteria.</p>
                        </div>
                        </div>
                        
                        
                    )}
                </div>
            </section>
        </div>
    );
    
}