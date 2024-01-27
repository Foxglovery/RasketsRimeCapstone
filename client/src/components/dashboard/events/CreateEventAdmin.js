import { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import { GetVenues } from "../../managers/venueManager";
import {
  AvailableServicesByVenueId,
  GetServices,
} from "../../managers/serviceManager";

import DateDropdowns from "../../DateDropdowns";
import DurationDropdown from "../../DurationDropdown";
import { CreateEvent } from "../../managers/eventManager";
import { useNavigate } from "react-router-dom";
import '../../styles/dash/CreateEventAdmin.css'

export default function CreateEventAdmin({loggedInUser}) {
  const navigate = useNavigate();
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
    serviceIds: serviceIds
  }
  

  useEffect(() => {
    GetVenues().then(setVenues);
  }, []);
  useEffect(() => {
    GetServices().then(setFilteredServices);
  }, []);

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

const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  try {
      const data = await CreateEvent(newEvent); // Using the manager function

      if (data && !data.error) {
          // Assuming 'data' contains the successful response
          console.log('Event created successfully:', data);
          navigate(`/admin/events`);
      } else {
          // Handle any errors contained in the response
          console.error('Failed to create event:', data);
          // Show an error message to the user based on the data
      }
  } catch (error) {
      // Handle network errors or exceptions
      console.error('Error submitting event:', error);
      // Show an error message to the user
  }
};
  const currentMonth = eventStart.getMonth() + 1; // getMonth() returns 0-11
  const currentDay = eventStart.getDate();
  const currentYear = eventStart.getFullYear();
  const currentHour = eventStart.getHours();


  return (
    <div className="background-image">
    <Container className="my-5">
      <Row>
        <Col md={8} className="mx-auto">
          <h3  className="text-center create-form-text mb-4">Create An Event</h3>
          <Form>
            {/* Event Name */}
            <FormGroup>
              <Label for="eventName">Event Name</Label>
              <Input
                id="eventName"
                name="eventName"
                type="text"
                className="form-control"
                placeholder="Enter the name of your event"
                onChange={handleNameChange}
              />
            </FormGroup>

            {/* Venue Selection */}
            <FormGroup>
              <Label for="venueSelect">Venue</Label>
              <Input
                id="venueSelect"
                name="venueSelect"
                type="select"
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
              <Label for="expectedAttendees">Expected Attendees</Label>
              <Input
                id="expectedAttendees"
                name="expected"
                placeholder="Enter the number of attendees"
                type="number"
                onChange={handleExpectedChange}
              />
            </FormGroup>

            {/* Services Multi-select */}
            <FormGroup>
              <Label for="servicesMulti">Select Services</Label>
              <Input
                id="servicesMulti"
                multiple
                name="servicesMulti"
                type="select"
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
              <Label for="exampleText">Description</Label>
              <Input
                id="exampleText"
                name="text"
                type="textarea"
                onChange={handleDescriptionChange}
              />
            </FormGroup>

            {/* Date Dropdowns */}
            <div>
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
            </div>

            {/* Duration Dropdown */}
            <FormGroup>
              <Label for="duration">Duration</Label>
              <DurationDropdown onChange={handleDurationChange} />
            </FormGroup>

            {/* Public Checkbox */}
            <FormGroup check>
              <Input
                type="checkbox"
                checked={publicChecked}
                onChange={handlePublicChange}
              />{" "}
              <Label className="create-form-text" check>Is this event public?</Label>
            </FormGroup>

            {/* Submit Button */}
            <FormGroup className="text-center">
              <Button className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  </div>);
}
