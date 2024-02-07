import { useEffect, useState } from "react";
import {
  ActivateService,
  DeactivateService,
  GetServices,
} from "../../managers/serviceManager";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import withMinimumLoadingTime from "../../WithMinimumLoadingTime";
import CircleLoader from "react-spinners/CircleLoader";
export default function ServiceListAdmin({ loggedInUser }) {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    withMinimumLoadingTime(GetServices())
      .then((fetchedServices) => {
        setServices(fetchedServices);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching services", error);
        setIsLoading(false);
      });
  }, []);

  const handleDeactivate = (id) => {
    DeactivateService(id).then(() => {
      GetServices().then(setServices);
    });
  };
  const handleActivate = (id) => {
    ActivateService(id).then(() => {
      GetServices().then(setServices);
    });
  };
  //for to map over venues with that service
  const renderVenueNames = (venueServices) => {
    return venueServices.map((vs) => vs.venue.venueName).join(", ");
  };
  return (
    <div className="dashboard-background">
      <div className="centered-content">
        <h3>Services</h3>
        <div className="link-group" style={{ marginTop: "20px" }}>
          <Link to={`/userprofiles`} className="chip-link">
            Users
          </Link>
          <Link to={`/admin/events`} className="chip-link">
            Events
          </Link>
          <Link to={`/admin/venues`} className="chip-link">
            Venues
          </Link>
        </div>
        <div className="centered-content">
          <Button
            className="admin-service-btn"
            onClick={() => navigate(`/admin/services/create`)}
          >
            Add Service
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
            style={{ maxWidth: "90%", margin: "auto" }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Available At</th>
                <th>Price</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{service.serviceName}</td>
                  <td>{service.description}</td>
                  <td>{renderVenueNames(service.venueServices)}</td>
                  <td>${service.price}</td>
                  <td>{service.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    {service.isActive ? (
                      <Button
                        className="admin-reject-btn"
                        onClick={() => handleDeactivate(service.id)}
                      >
                        Deactivate
                      </Button>
                    ) : (
                      <Button
                        className="admin-approve-btn"
                        onClick={() => handleActivate(service.id)}
                      >
                        Activate
                      </Button>
                    )}
                  </td>
                  <td>
                    <Button
                      className="admin-update-event-btn"
                      onClick={() =>
                        navigate(`/admin/services/update/${service.id}`)
                      }
                    >
                      {" "}
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}
