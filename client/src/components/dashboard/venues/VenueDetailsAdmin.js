import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { GetVenueById } from "../../managers/venueManager";
import { GetEventsByVenueId } from "../../managers/eventManager";
import withMinimumLoadingTime from "../../WithMinimumLoadingTime";
import CircleLoader from "react-spinners/CircleLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";


export default function VenueDetailsAdmin({ loggedInUser }) {
  const { id } = useParams();
  const [venue, setVenue] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    withMinimumLoadingTime(GetVenueById(id)).then((fetchedVenue) => {
      setVenue(fetchedVenue);
    });
    withMinimumLoadingTime(GetEventsByVenueId(id)).then((fetchedEvents) => {
      setEvents(fetchedEvents);
      setIsLoading(false);
    });
  }, [id]);

  //accumulator for total booked service revenue for venue
  //go through events and take a bag with you
  //for every event, shove total cost in the bag
  //return bag
  const sumServicePrice = events?.reduce(
    (acc, event) => acc + event.totalCost,
    0
  );

  return (
    <div className="dashboard-background">
      <div className="centered-content">
        <h3>Venue</h3>
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
                <td>{venue?.venueName}</td>
              </tr>

              <tr>
                <th>Description</th>
                <td>{venue?.description}</td>
              </tr>
              <tr>
                <th>Max Occupancy</th>
                <td>{venue?.maxOccupancy}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{venue?.address}</td>
              </tr>
              <tr>
                <th>Contact Info</th>
                <td>{venue?.contactInfo}</td>
              </tr>
              <tr>
                <th>Is Active</th>
                <td>{venue?.isActive ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />}</td>
              </tr>
              <tr>
                <th>Total Service Revenue</th>
                <td>${sumServicePrice}</td>
              </tr>
            </tbody>
          </Table>
          <div className="centered-content">
            <h3>Venue Services</h3>
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
              {venue.venueServices?.map((service, serviceIndex) => (
                <tr key={serviceIndex}>
                  <th scope="row">{serviceIndex + 1}</th>
                  <td>{service.service.serviceName}</td>
                  <td>{service.service.description}</td>
                  <td>${service.service.price}</td>
                  <td>{service.service.isActive ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}
