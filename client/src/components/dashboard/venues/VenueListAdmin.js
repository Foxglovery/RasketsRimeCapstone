
import { useEffect, useState } from "react"
import { GetVenues } from "../../managers/venueManager";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

export default function VenueListAdmin() {
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        GetVenues().then(setVenues);
    },[])

    return (
        <>
        <div>
        <Link to={`/admin/events`}>Events</Link>
      </div>
      <div>
        <Link to={`/userprofiles`}>Users</Link>
      </div>
      <div>
        <Link to={`/admin/services`}>Services</Link>
      </div>
        <h3>Venues</h3>
      <Table dark striped>
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Max Occupancy</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {venues.map((v) => (
                <tr key={v.id}>
                    <th scope="row">{v.id}</th>
                    <td>{v.venueName}</td>
                    <td>{v.address}</td>
                    <td>{v.contactInfo}</td>
                    <td>{v.maxOccupancy}</td>
                    <td><Link to={`${v.id}`}>Details</Link></td>
                </tr>
            ))}
        </tbody>
      </Table>

        </>
    )
}