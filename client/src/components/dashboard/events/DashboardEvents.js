import { useEffect, useState } from "react";
import {
  AdminCancelEvent,
  ApproveEvent,
  DeleteEvent,
  GetEvents,
  GetPending,
  RejectEvent,
} from "../../managers/eventManager";
import { Button, Table } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from '../../../assets/brown-blue-wood.jpg';
import '../../styles/DashboardEvents.css'
export default function DashboardEvents({loggedInUser}) {
  const [events, setEvents] = useState([]);
  const [showPending, setShowPending] = useState(false);
  const navigate = useNavigate();
//if showPending is false, get all events
//if it is true then fetch and set pending
  useEffect(() => {
    if (!showPending)
    {
      GetEvents().then(setEvents)
      .catch((error) => {
        console.error(
          "There was an error", error
        );
      });
    } else {
      GetPending().then(setEvents);
    }
    
  }, [showPending]);

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

  const formatEventTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };
  
  const backgroundStyle = {
    minHeight: '100vh',
    background: `url(${backgroundImage}) no-repeat center center fixed`, 
    backgroundSize: 'cover', 
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
      <div className="centered-content">
        <Button  className="admin-event-btn"onClick={() => navigate("/admin/events/create")}>Add Event</Button>
        {showPending ? <Button  className="pending-btn"onClick={() => setShowPending(!showPending)}>Show All</Button> : <Button  className="pending-btn"onClick={() => setShowPending(!showPending)}>Pending</Button>}
        
      </div>
      {events.length > 0 ? <Table dark striped className="mt-4 event-rounded-table" style={{ maxWidth: '80%', margin: 'auto' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>User</th>
            <th>Venue</th>
            <th>Address</th>
            <th>Submitted</th>
            <th>Event Start</th>
            <th>Event End</th>
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
          {events.map((e, index) => (
            <tr key={e.id}>
              <th scope="row">{index + 1}</th>
              <td>{e.eventName}</td>
              <td>
                {e.userProfile.firstName} {e.userProfile.lastName}
              </td>
              <td>{e.venue.venueName}</td>
              <td>{e.venue.address}</td>
              <td>{formatEventTime(e.submitedOn)}</td>
              <td>{formatEventTime(e.eventStart)}</td>
              <td>{formatEventTime(e.eventEnd)}</td>
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
                  <Button className="admin-cancel-btn" onClick={() => handleCancel(e.id)}>
                    Cancel
                  </Button>
                </td>
              ) : (
                <td>
                  <Button className="admin-cancel-btn" disabled>
                    Cancel
                  </Button>
                </td>
              )}
              {e.status === "Pending" || e.status === "Approved"? (
                <td>
                  <Button className="admin-reject-btn"  onClick={() => handleReject(e.id)}>
                    Reject
                  </Button>
                </td>
              ) : (
                <td>
                  <Button className="admin-reject-btn" disabled>
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
                <Button className="admin-update-event-btn" onClick={() => navigate(`/admin/events/update/${e.id}`)}>
                  Update
                </Button>
              </td>

              <td>
                <Link className="details" to={`${e.id}`}><Button className="admin-details-event-btn">Details</Button></Link>
              </td>
            </tr>
          ))}
           {/*conditional goes  */}
        </tbody>
      </Table> : <div className="no-events-center">
              <div className="no-events-container">
                <p className="no-events-message">
                  There are no events pending approval.
                </p>
              </div>
            </div>}
      
    </div>
    </>
  );
}
