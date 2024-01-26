import { useEffect, useState } from "react";
import { GetProfiles } from "../../managers/userProfileManager";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

export default function UserProfileList() {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    GetProfiles().then(setUserProfiles);
  }, []);

  return (
    <>
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
      <h3>Users</h3>
      <Table dark striped>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>IsAdmin</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {userProfiles.map((up) => (
            <tr key={up.Id}>
              <th scope="row">{up.id}</th>
              <td>{up.firstName}</td>
              <td>{up.lastName}</td>
              <td>{up.userName}</td>
              <td>{up.email}</td>
              <td>{up.address}</td>
              <td>{up.isAdmin ? "yes" : "no"}</td>
              <td>
                <Link to={`${up.id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
