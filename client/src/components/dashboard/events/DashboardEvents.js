import { useEffect, useState } from "react";
import {
  AdminCancelEvent,
  ApproveEvent,
  DeleteEvent,
  GetEvents,
  RejectEvent,
} from "../../managers/eventManager";
import { Button, Table } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from '../../../assets/brown-blue-wood.jpg';
import '../../styles/DashboardEvents.css'
export default function DashboardEvents({loggedInUser}) {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetEvents().then(setEvents);
  }, []);

  const handleApprove = (id) => {
    ApproveEvent(id).then(() => {
      GetEvents().then(setEvents);
    });
  };

  const handleCancel = (id) => {
    AdminCancelEvent(id).then(() => {
      GetEvents().then(setEvents);
    });
  };
  const handleReject = (id) => {
    RejectEvent(id).then(() => {
      GetEvents().then(setEvents);
    });
  };
  const handleDelete = (id) => {
    DeleteEvent(id).then(() => {
      GetEvents().then(setEvents);
    });
  };
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
        <h3>Events</h3>
      </div>
      <div className="centered-content">
        <Link to={`/userprofiles`} className="chip-link">Users</Link>
        <Link to={`/admin/venues`} className="chip-link">Venues</Link>
        <Link to={`/admin/services`} className="chip-link">Services</Link>
      </div>
      <Table dark striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>User</th>
            <th>Venue</th>
            <th>Address</th>
            <th>Status</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id}>
              <th scope="row">{e.id}</th>
              <td>{e.eventName}</td>
              <td>
                {e.userProfile.firstName} {e.userProfile.lastName}
              </td>
              <td>{e.venue.venueName}</td>
              <td>{e.venue.address}</td>
              <td>{e.status}</td>
              {e.status !== "Approved" ? (
                <td>
                  <Button color="primary" onClick={() => handleApprove(e.id)}>
                    Approve
                  </Button>
                </td>
              ) : (
                <td>
                  <Button color="primary" disabled>
                    Approve
                  </Button>
                </td>
              )}
              {e.status === "Approved" ? (
                <td>
                  <Button color="warning" onClick={() => handleCancel(e.id)}>
                    Cancel
                  </Button>
                </td>
              ) : (
                <td>
                  <Button color="warning" disabled>
                    Cancel
                  </Button>
                </td>
              )}
              {e.status === "Pending" ? (
                <td>
                  <Button color="warning" onClick={() => handleReject(e.id)}>
                    Reject
                  </Button>
                </td>
              ) : (
                <td>
                  <Button color="warning" disabled>
                    Reject
                  </Button>
                </td>
              )}
              <td>
                <Button color="danger" onClick={() => handleDelete(e.id)}>
                  Delete
                </Button>
              </td>
              <td>
                <Button color="warning" onClick={() => navigate(`/admin/events/update/${e.id}`)}>
                  Update
                </Button>
              </td>

              <td>
                <Link to={`${e.id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </>
  );
}
