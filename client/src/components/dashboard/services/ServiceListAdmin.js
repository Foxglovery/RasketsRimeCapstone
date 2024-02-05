import { useEffect, useState } from "react"
import { ActivateService, DeactivateService, GetServices } from "../../managers/serviceManager";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import backgroundImage from '../../../assets/brown-blue-wood.jpg';
export default function ServiceListAdmin({loggedInUser}) {
    const [services, setServices] = useState([]);
    const [activeChange, setActiveChange] = useState(false);
    const navigate = useNavigate();

    //for to map over venues with each service
    const renderVenueNames = (venueServices) => {
        return venueServices.map(vs => vs.venue.venueName).join(", ");
    }
    useEffect(() => {
        GetServices().then(setServices);
    },[activeChange])

    const backgroundStyle = {
      minHeight: '100vh',
      background: `url(${backgroundImage}) no-repeat center center fixed`, 
      backgroundSize: 'cover', 
      color: 'white',
  };
  const handleDeactivate = (id) => {
    DeactivateService(id).then(() => {
      setActiveChange(!activeChange);
    })
  }
  const handleActivate = (id) => {
    ActivateService(id).then(() => {
      setActiveChange(!activeChange);
    })
  }
    return (
      <div style={backgroundStyle}>
      <div className="centered-content">
        <h3>Services</h3>
        <div className="link-group" style={{ marginTop: '20px' }}>
          <Link to={`/userprofiles`} className="chip-link">Users</Link>
          <Link to={`/admin/events`} className="chip-link">Events</Link>
          <Link to={`/admin/venues`} className="chip-link">Venues</Link>
        </div>
        <div className="centered-content">
          <Button className="admin-service-btn" onClick={() => navigate(`/admin/services/create`)}>Add Service</Button>
      </div>
        <Table dark striped className="mt-4 event-rounded-table" style={{ maxWidth: '90%', margin: 'auto' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Available At</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
              <th></th>
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
                <td>{service.isActive ? "Active" : "Inactive"}</td>
                <td>{service.isActive ? (
                  <Button className="admin-reject-btn" onClick={() => handleDeactivate(service.id)}>Deactivate</Button>
                ) : (
                  <Button className="admin-approve-btn" onClick={() => handleActivate(service.id)}>Activate</Button>
                )}</td>
                <td><Button className="admin-update-event-btn" onClick={() => navigate(`/admin/services/update/${service.id}`)}> Update</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
        
      </div>
    </div>
    
    )
}