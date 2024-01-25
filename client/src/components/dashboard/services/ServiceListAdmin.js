import { useEffect, useState } from "react"
import { GetServices } from "../../managers/serviceManager";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

export default function ServiceListAdmin() {
    const [services, setServices] = useState([]);


    const renderVenueNames = (venueServices) => {
        return venueServices.map(vs => vs.venue.venueName).join(", ");
    }
    useEffect(() => {
        GetServices().then(setServices);
    },[])
    return (
        <>
        <h3>Services</h3>
      <div>
        <Link to={`/admin/events`}>Events</Link>
      </div>
      <div>
        <Link to={`/userprofiles`}>Users</Link>
      </div>
      <div>
        <Link to={`/admin/venues`}>Venues</Link>
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
        </>
    )
}