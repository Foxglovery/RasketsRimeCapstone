import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import {
  AvailableServicesByVenueId,
  GetServices,
} from "../../managers/serviceManager";
import { GetVenues } from "../../managers/venueManager";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetEventToUpdateById, UpdateEvent } from "../../managers/eventManager";
import DateDropdowns from "../../DateDropdowns";
import DurationDropdown from "../../DurationDropdown";
import "../../../styles/dash/UpdateEventAdmin.css";
export default function UpdateEventAdmin({ loggedInUser }) {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [venues, setVenues] = useState([]);
  const [chosenVenueId, setChosenVenueId] = useState(null);
  const [eventName, setEventName] = useState("");
  const [expected, setExpected] = useState(0);
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [eventStart, setEventStart] = useState(new Date());
  const [duration, setDuration] = useState(1);
  const [serviceIds, setServiceIds] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [publicChecked, setpublicChecked] = useState(true);

  const newEvent = {
    userId: loggedInUser.id,
    venueId: chosenVenueId,
    expectedAttendees: expected,
    eventDescription: description,
    duration: duration,
    status: "Pending",
    isPublic: isPublic,
    eventName: eventName,
    eventStart: eventStart.toISOString(),
    serviceIds: serviceIds,
  };

  useEffect(() => {
    GetVenues().then(setVenues);
  }, []);
  useEffect(() => {
    GetServices().then(setFilteredServices);
  }, []);

  useEffect(() => {
    GetEventToUpdateById(eventId).then((event) => {
      setEventName(event.eventName);
      setChosenVenueId(event.venueId);
      setExpected(event.expectedAttendees);
      setDescription(event.eventDescription);
      setIsPublic(event.isPublic);
      setServiceIds(event.serviceIds);

      const existingEventStart = new Date(event.eventStart);
      setEventStart(existingEventStart);
    });
  }, [eventId]);

  useEffect(() => {
    if (chosenVenueId) {
      AvailableServicesByVenueId(chosenVenueId).then(setFilteredServices);
    }
  }, [chosenVenueId]);

  const handleVenueChange = (event) => {
    setChosenVenueId(parseInt(event.target.value));
  };
  const handleNameChange = (event) => {
    setEventName(event.target.value);
  };
  const handleExpectedChange = (event) => {
    setExpected(parseInt(event.target.value));
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  //create new array of service ids from selected services
  const handleServiceSelection = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) =>
      //converts value of option to an integer
      parseInt(option.value)
    );
    setServiceIds(selectedOptions);
  };
  const handlePublicChange = () => {
    setpublicChecked(!publicChecked);
  };
  const handleMonthChange = (e) => {
    const newDate = new Date(eventStart.setMonth(parseInt(e.target.value) - 1)); //accounting for the +1 needed for the 0 indexed months in dropdown
    setEventStart(new Date(newDate));
  };

  const handleDayChange = (e) => {
    const newDate = new Date(eventStart.setDate(parseInt(e.target.value)));
    setEventStart(new Date(newDate));
  };

  const handleYearChange = (e) => {
    const newDate = new Date(eventStart.setFullYear(parseInt(e.target.value)));
    setEventStart(new Date(newDate));
  };
  const handleDurationChange = (newDuration) => {
    setDuration(parseInt(newDuration));
  };
  const handleHourChange = (e) => {
    const newDate = new Date(eventStart);
    newDate.setHours(parseInt(e.target.value));
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    setEventStart(newDate);
  };

  const currentMonth = eventStart.getMonth() + 1; //accounting for the 0 index
  const currentDay = eventStart.getDate();
  const currentYear = eventStart.getFullYear();
  const currentHour = eventStart.getHours();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await UpdateEvent(eventId, newEvent);

      if (data && !data.error) {
        console.log("Event created successfully:", data);
        navigate(`/admin/events`);
      } else {
        console.error("Failed to create event:", data);
      }
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };
  return (
    <div className="dashboard-background">
      <Container className="">
        <Row>
          <Col md={8} className="mx-auto">
            <h3 className="text-center create-form-text mb-4">
              Update An Event
            </h3>
            <div className="centered-content">
              <Link to={`/admin/events`} className="chip-link">
                Events
              </Link>
              <Link to={`/admin/venues`} className="chip-link">
                Venues
              </Link>
              <Link to={`/admin/services`} className="chip-link">
                Services
              </Link>
            </div>
            <Form>
              {/* Event Name */}
              <FormGroup>
                <Label for="eventName" className="create-form-text">
                  Event Name
                </Label>
                <Input
                  required
                  id="eventName"
                  name="eventName"
                  type="text"
                  value={eventName}
                  className="form-control"
                  placeholder="Enter the name of your event"
                  onChange={handleNameChange}
                />
              </FormGroup>

              {/* Venue Select */}
              <FormGroup>
                <Label for="venueSelect" className="create-form-text">
                  Venue
                </Label>
                <Input
                  required
                  id="venueSelect"
                  name="venueSelect"
                  type="select"
                  value={chosenVenueId}
                  className="form-control"
                  onChange={handleVenueChange}
                >
                  <option value="">-- Select Venue --</option>
                  {venues.map((venue, index) => (
                    <option key={index} value={venue.id}>
                      {venue.venueName} (Max Attendees: {venue.maxOccupancy})
                    </option>
                  ))}
                </Input>
              </FormGroup>

              {/* Expected Attendees */}
              <FormGroup>
                <Label for="expectedAttendees" className="create-form-text">
                  Expected Attendees
                </Label>
                <Input
                  required
                  id="expectedAttendees"
                  name="expected"
                  placeholder="Enter the number of attendees"
                  type="number"
                  value={expected}
                  onChange={handleExpectedChange}
                />
              </FormGroup>

              {/* Services multiselect */}
              <FormGroup>
                <Label for="servicesMulti" className="create-form-text">
                  Select Services
                </Label>
                <Input
                  id="servicesMulti"
                  multiple
                  name="servicesMulti"
                  type="select"
                  value={serviceIds}
                  className="form-control"
                  onChange={handleServiceSelection}
                >
                  {filteredServices.map((service, index) => (
                    <option key={index} value={service.id}>
                      {service.serviceName}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              {/* Event Description */}
              <FormGroup>
                <Label for="description" className="create-form-text">
                  Description
                </Label>
                <Input
                  required
                  id="description"
                  name="text"
                  type="textarea"
                  value={description}
                  placeholder="Describe your event"
                  onChange={handleDescriptionChange}
                />
              </FormGroup>

              {/* Datetime dropdowns */}
              <FormGroup>
                <DateDropdowns
                  handleDayChange={handleDayChange}
                  handleMonthChange={handleMonthChange}
                  handleYearChange={handleYearChange}
                  handleHourChange={handleHourChange}
                  currentDay={currentDay}
                  currentMonth={currentMonth}
                  currentYear={currentYear}
                  currentHour={currentHour}
                />
              </FormGroup>

              {/* duration dropdown */}
              <div className="duration-dropdown-container">
                <FormGroup>
                  <DurationDropdown onChange={handleDurationChange} />
                </FormGroup>
              </div>

              {/* isPublic checkbox */}
              <FormGroup check className="center-checkbox">
                <Input
                  type="checkbox"
                  checked={publicChecked}
                  onChange={handlePublicChange}
                />{" "}
                <Label className="create-form-text" check>
                  Is this event public?
                </Label>
              </FormGroup>

              {/* Submit */}
              <FormGroup className="text-center">
                <Button
                  className="btn btn-primary create-event-submit-btn mt-3"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
