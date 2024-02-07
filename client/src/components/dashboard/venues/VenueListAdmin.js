import { useEffect, useState } from "react";
import {
  ActivateVenue,
  DeactivateVenue,
  GetVenues,
} from "../../managers/venueManager";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import withMinimumLoadingTime from "../../WithMinimumLoadingTime";
import CircleLoader from "react-spinners/CircleLoader";

export default function VenueListAdmin({ loggedInUser }) {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    withMinimumLoadingTime(GetVenues())
      .then((fetchedVenues) => {
        setVenues(fetchedVenues);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error", error);
        setIsLoading(false);
      });
  }, []);

  const handleDeactivate = (id) => {
    DeactivateVenue(id).then(() => {
      GetVenues().then(setVenues);
    });
  };
  const handleActivate = (id) => {
    ActivateVenue(id).then(() => {
      GetVenues().then(setVenues);
    });
  };
  return (
    <div className="dashboard-background">
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
      <div className="centered-content">
        <Button
          className="admin-service-btn"
          onClick={() => navigate(`/admin/venues/create`)}
        >
          Add Venue
        </Button>
      </div>
      {isLoading ? (
        <div className="dashboard-event-spinner">
          <CircleLoader color="white" size={100} />
        </div>
      ) : (
        <Table
          dark
          striped
          className="mt-4 event-rounded-table"
          style={{ maxWidth: "80%", margin: "auto" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Max Occupancy</th>
              <th>Status</th>
              <th></th>
              <th></th>
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
                <td>{v.isActive ? "Active" : "Inactive"}</td>
                <td>
                  {v.isActive ? (
                    <Button
                      className="admin-reject-btn"
                      onClick={() => handleDeactivate(v.id)}
                    >
                      Deactivate
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      onClick={() => handleActivate(v.id)}
                    >
                      Activate
                    </Button>
                  )}
                </td>
                <td>
                  <Button
                    className="admin-update-event-btn"
                    onClick={() => navigate(`/admin/venues/update/${v.id}`)}
                  >
                    Update
                  </Button>
                </td>
                <td>
                  <Link to={`${v.id}`}>
                    <Button className="admin-details-event-btn">Details</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
