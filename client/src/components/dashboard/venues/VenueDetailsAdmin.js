import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Table } from "reactstrap";
import { GetVenueById } from "../../managers/venueManager";
import backgroundImage from '../../../assets/brown-blue-wood.jpg';

export default function VenueDetailsAdmin({loggedInUser}) {
    const {id} = useParams();
    const [venue, setVenue] = useState([]);

    useEffect(() => {
        GetVenueById(id).then(setVenue);
    },[id])
    
    const backgroundStyle = {
      minHeight: '100vh',
      background: `url(${backgroundImage}) no-repeat center center fixed`, 
      backgroundSize: 'cover', // Ensure it covers the entire background
      color: 'white',
  };
    return (
        <>
      <div style={backgroundStyle}>
      <div className="centered-content">
        <h3>Venue</h3>
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
      <div className="centered-content">
      <h4>Venue Services</h4>
      </div>
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
      </div>
    </>
    )
}