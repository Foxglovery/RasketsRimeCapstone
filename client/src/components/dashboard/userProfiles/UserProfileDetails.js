import { useEffect, useState } from "react";
import { GetProfile } from "../../managers/userProfileManager";
import { Link, useParams } from "react-router-dom";

import { Table } from "reactstrap";

export default function UserProfileDetails({loggedInUser}) {
  const [userProfile, setUserProfile] = useState({});

  const { id } = useParams();

  useEffect(() => {
    GetProfile(id).then(setUserProfile);
  }, [id]);

  return (
    <>
      <h2>User</h2>

      <div>
        <Link to={`/admin/events`}>Events</Link>
      </div>
      <div>
        <Link to={`/userprofiles`}>Users</Link>
      </div>
      <div>
        <Link to={`/admin/venues`}>Venues</Link>
      </div>
      <div>
        <Link to={`/admin/services`}>Services</Link>
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
      <h2>User's Events</h2>
      {userProfile.events &&
        userProfile.events.map((event, index) => (
          <div key={index}>
            <h3>
              Event {index + 1}: {event.eventName}
            </h3>
            <Table dark striped>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Event Name</td>
                  <td>{event.eventName}</td>
                </tr>
                <tr>
                  <td>Expected Attendees</td>
                  <td>{event.expectedAttendees}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{event.eventDescription}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{event.status}</td>
                </tr>
                {/* ... other event properties */}
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
    </>
  );
}
