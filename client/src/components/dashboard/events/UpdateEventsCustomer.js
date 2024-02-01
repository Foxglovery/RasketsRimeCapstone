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
import { CreateEvent, GetEventToUpdateById, UpdateEvent } from "../../managers/eventManager";
import DateDropdowns from "../../DateDropdowns";
import DurationDropdown from "../../DurationDropdown";

export default function UpdateEventCustomer({ loggedInUser }) {
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
  const [eventToUpdate, setEventToUpdate] = useState({});
  const [existingServiceIds, setExistingServiceIds] = useState([]);
  const [existingMonth, setExistingMonth] = useState(0);
  const [existingDay, setExistingDay] = useState(0);
  const [existingYear, setExistingYear] = useState(0);
  const [existingHour, setExistingHour] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
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
      setEventToUpdate(event);
      setExistingServiceIds(event.serviceIds);
      setEventName(event.eventName);
      setChosenVenueId(event.venueId);
      setExpected(event.expectedAttendees);
      setDescription(event.eventDescription);
      setIsPublic(event.isPublic);
      setServiceIds(event.serviceIds);

      const existingEventStart = new Date(event.eventStart);
      setEventStart(existingEventStart);
      setExistingMonth(existingEventStart.getMonth() + 1);
      setExistingDay(existingEventStart.getDate());
      setExistingYear(existingEventStart.getFullYear());
      setExistingHour(existingEventStart.getHours());
      
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
  const handleServiceSelection = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setServiceIds(selectedOptions);
  };
  const handlePublicChange = () => {
    setpublicChecked(!publicChecked);
  };
  const handleMonthChange = (e) => {
    const newDate = new Date(eventStart.setMonth(parseInt(e.target.value) - 1));
    setEventStart(new Date(newDate)); // Update month
  };

  const handleDayChange = (e) => {
    const newDate = new Date(eventStart.setDate(parseInt(e.target.value)));
    setEventStart(new Date(newDate)); // Update day
  };

  const handleYearChange = (e) => {
    const newDate = new Date(eventStart.setFullYear(parseInt(e.target.value)));
    setEventStart(new Date(newDate)); // Update year
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

  
  const currentMonth = eventStart.getMonth() + 1; 
  const currentDay = eventStart.getDate();
  const currentYear = eventStart.getFullYear();
  const currentHour = eventStart.getHours();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await UpdateEvent(eventId, newEvent);

      if (!response.ok) {
        //if the server responds with error
        const errorText = await response.text();
        setErrorMessage(errorText || "Failed to update event. Please check your inputs.");
        console.error("Failed to update event", errorText);
        return;
      }
      const data = await response.json();;
      console.log("Event updated successfully", data);
      navigate(`/myEvents`);
    } catch (error) {
      console.error("Error submitting event:", error);
      setErrorMessage(error.toString());
    }
  };
  return (
    <div className="background-image">
      <Container className="">
        <Row>
          <Col md={8} className="mx-auto">
            <h3 className="text-center create-form-text mb-4">
              Update An Event
            </h3>
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
                <Label for="exampleText" className="create-form-text">
                  Description
                </Label>
                <Input
                  required
                  id="exampleText"
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

              {/* duration dropddown */}
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
              {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                <Button className="btn btn-primary create-event-submit-btn mt-3" onClick={handleSubmit}>
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
