import { useEffect, useState } from "react";
import { GetProfile } from "../../managers/userProfileManager";
import { Link, useParams } from "react-router-dom";

import { Table } from "reactstrap";
import backgroundImage from "../../../assets/brown-blue-wood.jpg";

export default function UserProfileDetails({ loggedInUser }) {
  const [userProfile, setUserProfile] = useState({});

  const { id } = useParams();

  useEffect(() => {
    GetProfile(id).then(setUserProfile);
  }, [id]);

  const backgroundStyle = {
    minHeight: "100vh",
    background: `url(${backgroundImage}) no-repeat center center fixed`,
    backgroundSize: "cover",
    color: "white",
  };

  return (
    <>
      <div style={backgroundStyle}>
        <div className="centered-content">
          <h3>User</h3>
        </div>
        <div className="centered-content">
          <Link to={`/userprofiles`} className="chip-link">
            Users
          </Link>
          <Link to={`/admin/events`} className="chip-link">
            Events
          </Link>
          <Link to={`/admin/venues`} className="chip-link">
            Venues
          </Link>
          <Link to={`/admin/services`} className="chip-link">
            Services
          </Link>
        </div>
        <Table dark striped className="mt-4" style={{ maxWidth: '80%', margin: 'auto' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>IsAdmin</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {userProfile.firstName} {userProfile.lastName}
              </td>
              <td>{userProfile.address}</td>
              <td>{userProfile.isAdmin ? "Yes" : "No"}</td>
            </tr>
          </tbody>
        </Table>
        {/* Event Information Table */}
        <div className="centered-content">
          <h3>User's Events</h3>
        </div>
        {userProfile.events &&
          userProfile.events.map((event, index) => (
            <div key={index}>
              <div className="centered-content">
                <h4>
                  Event {index + 1}: {event.eventName}
                </h4>
              </div>

              <Table dark striped className="mt-4" style={{ maxWidth: '80%', margin: 'auto' }}>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Expected Attendees</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{event.eventName}</td>
                    <td>{event.expectedAttendees}</td>
                    <td>{event.eventDescription}</td>
                    <td>{event.status}</td>
                  </tr>
                </tbody>
              </Table>
            <div className="centered-content">
              <h3>Event Services</h3>
              <Table dark striped className="mt-4" style={{ maxWidth: '80%', margin: 'auto' }}>
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
                  {event.eventServices.map((service, serviceIndex) => (
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
              
            </div>
          ))}
      </div>
    </>
  );
}
