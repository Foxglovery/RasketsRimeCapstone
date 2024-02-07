import { useEffect, useState } from "react";
import { GetProfiles } from "../../managers/userProfileManager";
import { Button, Table } from "reactstrap";
import { Link } from "react-router-dom";
import withMinimumLoadingTime from "../../WithMinimumLoadingTime";
import CircleLoader from "react-spinners/CircleLoader";

export default function UserProfileList({ loggedInUser }) {
  const [userProfiles, setUserProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    withMinimumLoadingTime(GetProfiles())
      .then((fetchedProfiles) => {
        setUserProfiles(fetchedProfiles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching profiles", error);
      });
  }, []);

  return (
    
      <div className="dashboard-background">
        <div className="centered-content">
          <h3>Users</h3>
        </div>
        <div className="centered-content">
          <Link to={`/admin/venues`} className="chip-link">
            Venues
          </Link>
          <Link to={`/admin/events`} className="chip-link">
            Events
          </Link>
          <Link to={`/admin/services`} className="chip-link">
            Services
          </Link>
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
                    <Link to={`${up.id}`}>
                      <Button className="admin-details-event-btn">
                        Details
                      </Button>
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
