import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Table } from "reactstrap";
import { GetVenueById } from "../../managers/venueManager";

export default function VenueDetailsAdmin() {
    const {id} = useParams();
    const [venue, setVenue] = useState([]);

    useEffect(() => {
        GetVenueById(id).then(setVenue);
    },[id])
    
    
    return (
        <>
      <div>
        <Link to={`/admin/events`}>Events</Link>
      </div>
      <div>
        <Link to={`/userprofiles`}>Users</Link>
      </div>
      <div>
        <Link to={`/admin/venues`}>Venues</Link>
      </div>
      <div>
        <Link to={`/admin/services`}>Services</Link>
      </div>
      <h3>Venue</h3>
      <Table dark striped>
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
            <td>
              {venue?.maxOccupancy}
            </td>
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
            <td>{venue?.isActive ? "Yes" : "No"}</td>
          </tr>
          
        </tbody>
      </Table>

      <h4>Venue Services</h4>
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
          {venue.venueServices?.map((service, serviceIndex) => (
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
    )
}