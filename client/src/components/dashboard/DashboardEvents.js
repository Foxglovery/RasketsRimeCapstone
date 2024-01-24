import { useEffect, useState } from "react"
import { GetEvents } from "../managers/eventManager";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";

export default function DashboardEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        GetEvents().then(setEvents);
    },[])
    return (
        <Table dark striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>User</th>
          <th>Venue</th>
          <th>Address</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          
        </tr>
      </thead>
      <tbody>
        {events.map((e) => (
          <tr key={e.Id}>
            <th scope="row">{e.id}</th>
            <td>{e.eventName}</td>
            <td>{e.userProfile.firstName} {e.userProfile.lastName}</td>
            <td>{e.venue.venueName}</td>
            <td>{e.venue.address}</td>
            <td><Button>Approve</Button></td>
            
            <td>
              <Link to={`${e.id}`}>Details</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    )
}