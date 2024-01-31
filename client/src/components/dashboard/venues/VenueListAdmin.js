import { useEffect, useState } from "react";
import { GetVenues } from "../../managers/venueManager";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import backgroundImage from "../../../assets/brown-blue-wood.jpg";

export default function VenueListAdmin({ loggedInUser }) {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    GetVenues().then(setVenues);
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
          <h3>Venues</h3>
        </div>
        <div className="centered-content">
          <Link to={`/userprofiles`} className="chip-link">
            Users
          </Link>
          <Link to={`/admin/events`} className="chip-link">
            Events
          </Link>
          <Link to={`/admin/services`} className="chip-link">
            Services
          </Link>
        </div>
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
                <td>
                  <Link to={`${v.id}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>{" "}
    </>
  );
}
