import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { AvailableServicesByVenueId, GetServices } from "../../managers/serviceManager";
import { GetVenues } from "../../managers/venueManager";
import { Link, useParams } from "react-router-dom";
import { GetEventById } from "../../managers/eventManager";
import DateDropdowns from "../../DateDropdowns";
import DurationDropdown from "../../DurationDropdown";

export default function UpdateEventAdmin({ loggedInUser }) {
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
    GetEventById(eventId).then(setEventToUpdate);
},[eventId])


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

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission behavior

//     try {
//       const response = await (newEvent); // Using the manager function
//       if (response.ok) {
//         // Handle successful creation
//         console.log("Event created successfully:", response.data);
//         // Optionally, redirect the user or update the state to reflect the changes
//       } else {
//         // Handle errors (non-successful HTTP response)
//         console.error("Failed to create event:", response);
//         // Show an error message to the user
//       }
//     } catch (error) {
//       // Handle network errors or exceptions
//       console.error("Error submitting event:", error);
//       // Show an error message to the user
//     }
//   };
  const currentMonth = eventStart.getMonth() + 1; // getMonth() returns 0-11
  const currentDay = eventStart.getDate();
  const currentYear = eventStart.getFullYear();
  const currentHour = eventStart.getHours();
  return (
    <>
      <h3>Update An Event</h3>
      <Form>
        <FormGroup>
          <Label for="eventName">Event</Label>
          <Input
            id="eventName"
            name="eventName"
            placeholder="Enter the name of your event."
            type="text"
            value={eventName}
            onChange={handleNameChange}
          />
        </FormGroup>

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

        <FormGroup>
          <Label for="expectedAttendees">Expected Attendees</Label>
          <Input
            id="expectedAttendees"
            name="expected"
            placeholder="Enter the number of folks you expect"
            type="text"
            onChange={handleExpectedChange}
          />
        </FormGroup>

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
        <FormGroup>
          <Label for="exampleText">Description</Label>
          <Input
            id="exampleText"
            name="text"
            type="textarea"
            onChange={handleDescriptionChange}
          />
        </FormGroup>
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
        <FormGroup>
          <Label for="duration">Duration</Label>
          <DurationDropdown onChange={handleDurationChange} />
        </FormGroup>

        <FormGroup check>
          <Input
            type="checkbox"
            checked={publicChecked}
            onChange={handlePublicChange}
          />{" "}
          <Label check>Is this public?</Label>
        </FormGroup>
        <FormGroup></FormGroup>
        {/* <Button onClick={handleSubmit}>Submit</Button> */}
      </Form>
      {/* <DatePicker 
            showIcon
            showTimeSelect
            timeIntervals={60}
            selected={eventStart}
            onChange={date => setEventStart(date)}
            /> */}
    </>
  );
}
