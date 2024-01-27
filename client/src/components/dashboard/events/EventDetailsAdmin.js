import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetEventById } from "../../managers/eventManager";
import { Table } from "reactstrap";
import backgroundImage from '../../../assets/brown-blue-wood.jpg';

export default function EventDetailsAdmin({loggedInUser}) {
  const { id } = useParams();
  const [event, setEvent] = useState();

  useEffect(() => {
    GetEventById(id).then(setEvent);
  }, [id]);

  const backgroundStyle = {
    minHeight: '100vh',
    background: `url(${backgroundImage}) no-repeat center center fixed`, 
    backgroundSize: 'cover', // Ensure it covers the entire background
    color: 'white',
};
  return (
    //add a table here to display event
    <>
      <div style={backgroundStyle}>
      <div className="centered-content">
        <h3>Event Details</h3>
      </div>
      <div className="centered-content">
        <Link to={`/userprofiles`} className="chip-link">Users</Link>
        <Link to={`/admin/events`} className="chip-link">Events</Link>
        <Link to={`/admin/venues`} className="chip-link">Venues</Link>
        <Link to={`/admin/services`} className="chip-link">Services</Link>
      </div>
      <Table dark striped>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{event?.eventName}</td>
          </tr>
          <tr>
            <th>Venue</th>
            <td>{event?.venue.venueName}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{event?.eventDescription}</td>
          </tr>
          <tr>
            <th># Attendees</th>
            <td>
              {event?.expectedAttendees} / {event?.venue.maxOccupancy}
            </td>
          </tr>
          <tr>
            <th>Submitted On</th>
            <td>{event?.submitedOn}</td>
          </tr>
          <tr>
            <th>Event Start</th>
            <td>{event?.eventStart}</td>
          </tr>
          <tr>
            <th>Event End</th>
            <td>{event?.eventEnd}</td>
          </tr>
          <tr>
            <th>Is Public</th>
            <td>{event?.isPublic ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>Total Cost</th>
            <td>${event?.totalCost}</td>
          </tr>
        </tbody>
      </Table>

      <h4>Event Services</h4>
      <Table dark striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Service Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>IsActive</th>
          </tr>
        </thead>
        <tbody>
          {event?.eventServices.map((service, serviceIndex) => (
            <tr key={serviceIndex}>
              <th scope="row">{serviceIndex + 1}</th>
              <td>{service.service.serviceName}</td>
              <td>{service.service.description}</td>
              <td>${service.service.price}</td>
              <td>{service.service.isActive ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
   </div> </>
  );
}
