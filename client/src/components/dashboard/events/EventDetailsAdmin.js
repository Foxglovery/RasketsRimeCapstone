import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetEventById } from "../../managers/eventManager";
import { Table } from "reactstrap";
import withMinimumLoadingTime from "../../WithMinimumLoadingTime";
import CircleLoader from "react-spinners/CircleLoader";

export default function EventDetailsAdmin({ loggedInUser }) {
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    withMinimumLoadingTime(GetEventById(id))
      .then((fetchedEvent) => {
        setEvent(fetchedEvent);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error", error);
        setIsLoading(false);
      });
  }, []);

  const formatEventTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };
  return (
    //add a table here to display event

    <div className="dashboard-background">
      <div className="centered-content">
        <h3>Event Details</h3>
      </div>
      <div className="centered-content">
        <Link to={`/userprofiles`} className="chip-link">
          Users
        </Link>
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
      {isLoading ? (
        <div className="dashboard-event-spinner">
          <CircleLoader color="white" size={100} />
        </div>
      ) : (
        <>
          <Table
            dark
            striped
            className="mt-4 event-rounded-table"
            style={{ maxWidth: "80%", margin: "auto" }}
          >
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
                <th>Event Start</th>
                <td>{formatEventTime(event?.eventStart)}</td>
              </tr>
              <tr>
                <th>Event End</th>
                <td>{formatEventTime(event?.eventEnd)}</td>
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
          <div className="centered-content">
            <h3>Event Services</h3>
          </div>

          <Table
            dark
            striped
            className="mt-4 event-rounded-table"
            style={{ maxWidth: "80%", margin: "auto" }}
          >
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
        </>
      )}
    </div>
  );
}
