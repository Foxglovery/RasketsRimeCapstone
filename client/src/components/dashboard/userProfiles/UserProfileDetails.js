import { useEffect, useState } from "react";
import { GetProfile } from "../../managers/userProfileManager";
import { Link, useParams } from "react-router-dom";

import { Table } from "reactstrap";
import backgroundImage from '../../../assets/brown-blue-wood.jpg';

export default function UserProfileDetails({loggedInUser}) {
  const [userProfile, setUserProfile] = useState({});

  const { id } = useParams();

  useEffect(() => {
    GetProfile(id).then(setUserProfile);
  }, [id]);

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
        <h3>User</h3>
      </div>
      <div className="centered-content">
        <Link to={`/userprofiles`} className="chip-link">Users</Link>
        <Link to={`/admin/events`} className="chip-link">Events</Link>
        <Link to={`/admin/venues`} className="chip-link">Venues</Link>
        <Link to={`/admin/services`} className="chip-link">Services</Link>
      </div>
      <Table dark striped>
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
          {/* ... other user properties */}
        </tbody>
      </Table>
      {/* Event Information Table */}
      <div className="centered-content">
      <h2>User's Events</h2>
      </div>
      {userProfile.events &&
        userProfile.events.map((event, index) => (
          <div key={index}>
            <div className="centered-content">
              <h3>
              Event {index + 1}: {event.eventName}
            </h3>
            </div>
            
            <Table dark striped>
  <thead>
    <tr>
      
      <th>Event Name</th>
      <th>Expected Attendees</th>
      <th>Description</th>
      <th>Status</th>
      {/* Add other headers here if you have more properties */}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{event.eventName}</td>
      <td>{event.expectedAttendees}</td>
      <td>{event.eventDescription}</td>
      <td>{event.status}</td>
      {/* Add other values here in the same order as the headers */}
    </tr>
  </tbody>
</Table>

            {/* Event Services Sub-Table */}
            <h4>Event Services</h4>
            <Table dark striped>
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
        ))}
    </div></>
  );
}
