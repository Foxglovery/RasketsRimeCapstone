import { useEffect, useState } from "react";
import {
  AdminCancelEvent,
  ApproveEvent,
  DeleteEvent,
  GetEvents,
  RejectEvent,
} from "../../managers/eventManager";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";

export default function DashboardEvents() {
  const [events, setEvents] = useState([]);

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
  return (
    <>
      <div>
        <Link to={`/userprofiles`}>Users</Link>
      </div>
      <div>
        <Link to={`/admin/venues`}>Venues</Link>
      </div>
      <div>
        <Link to={`/admin/services`}>Services</Link>
      </div>
      <h3>Events</h3>
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
                <Link to={`${e.id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
