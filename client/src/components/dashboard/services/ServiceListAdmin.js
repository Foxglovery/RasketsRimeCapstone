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
      backgroundSize: 'cover', // Ensure it covers the entire background
      color: 'white',
  };
    return (
        <>
        <div style={backgroundStyle}>
      {/* <div>
        <Link to={`/admin/events`}>Events</Link>
      </div>
      <div>
        <Link to={`/userprofiles`}>Users</Link>
      </div>
      <div>
        <Link to={`/admin/venues`}>Venues</Link>
      </div>
        <h3>Services</h3> */}
        <div className="centered-content">
        <h3>Services</h3>
      </div>
      <div className="centered-content">
        <Link to={`/admin/events`} className="chip-link">Events</Link>
        <Link to={`/userprofiles`} className="chip-link">Users</Link>
        <Link to={`/admin/venues`} className="chip-link">Venues</Link>
      </div>
      <Table dark striped>
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
            {services?.map((s) => (
                <tr key={s.id}>
                    <th scope="row">{s.id}</th>
                    <td>{s.serviceName}</td>
                    <td>{s.description}</td>
                    <td>{renderVenueNames(s.venueServices)}</td>
                    <td>${s.price}</td>
                </tr>
            ))}
        </tbody>
      </Table>
       </div> </>
    )
}