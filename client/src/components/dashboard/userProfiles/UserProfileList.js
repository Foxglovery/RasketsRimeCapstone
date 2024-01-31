import { useEffect, useState } from "react";
import { GetProfiles } from "../../managers/userProfileManager";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import backgroundImage from "../../../assets/brown-blue-wood.jpg";

export default function UserProfileList({ loggedInUser }) {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    GetProfiles().then(setUserProfiles);
  }, []);
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
          <h3>Users</h3>
        </div>
        <div className="centered-content">
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
      </div>
    </>
  );
}
