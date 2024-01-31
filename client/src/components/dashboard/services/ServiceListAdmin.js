import { useEffect, useState } from "react"
import { GetServices } from "../../managers/serviceManager";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import backgroundImage from '../../../assets/brown-blue-wood.jpg';
export default function ServiceListAdmin({loggedInUser}) {
    const [services, setServices] = useState([]);


    const renderVenueNames = (venueServices) => {
        return venueServices.map(vs => vs.venue.venueName).join(", ");
    }
    useEffect(() => {
        GetServices().then(setServices);
    },[])

    const backgroundStyle = {
      minHeight: '100vh',
      background: `url(${backgroundImage}) no-repeat center center fixed`, 
      backgroundSize: 'cover', 
      color: 'white',
  };
    return (
      <div style={backgroundStyle}>
      <div className="centered-content">
        <h3>Services</h3>
        <div className="link-group" style={{ marginTop: '20px' }}>
          <Link to={`/admin/events`} className="chip-link">Events</Link>
          <Link to={`/userprofiles`} className="chip-link">Users</Link>
          <Link to={`/admin/venues`} className="chip-link">Venues</Link>
        </div>
        <Table dark striped className="mt-4" style={{ maxWidth: '90%', margin: 'auto' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Available At</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service.id}>
                <th scope="row">{index + 1}</th>
                <td>{service.serviceName}</td>
                <td>{service.description}</td>
                <td>{renderVenueNames(service.venueServices)}</td>
                <td>${service.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        
      </div>
    </div>
    
    )
}