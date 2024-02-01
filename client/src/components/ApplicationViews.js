import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import UserProfileList from "./dashboard/userProfiles/UserProfileList";
import UserProfileDetails from "./dashboard/userProfiles/UserProfileDetails";
import DashboardEvents from "./dashboard/events/DashboardEvents";
import EventDetailsAdmin from "./dashboard/events/EventDetailsAdmin";
import VenueListAdmin from "./dashboard/venues/VenueListAdmin";
import VenueDetailsAdmin from "./dashboard/venues/VenueDetailsAdmin";
import ServiceListAdmin from "./dashboard/services/ServiceListAdmin";
import CreateEventAdmin from "./dashboard/events/CreateEventAdmin";
import UpdateEventAdmin from "./dashboard/events/UpdateEventAdmin";
import VenueList from "./customer/VenueList";
import ServiceList from "./customer/ServiceList";
import MyEventsList from "./customer/MyEventsList";
import UpcomingEvents from "./customer/UpcomingEvents";
import UpdateEventCustomer from "./dashboard/events/UpdateEventsCustomer";
import CreateEventCustomer from "./customer/CreateEventCustomer";
import CreateService from "./dashboard/services/CreateService";
import CreateVenue from "./dashboard/venues/CreateVenue";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            //Route elements are wrapped in AuthorizedRoute which checks logged in user's roles
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home />
            </AuthorizedRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <DashboardEvents />
            </AuthorizedRoute>
          }
        />
        <Route
          path="/admin/events/create"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <CreateEventAdmin loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />
        <Route
          path="/admin/events/update/:eventId"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <UpdateEventAdmin loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />
        <Route
          path="/admin/events/:id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <EventDetailsAdmin />
            </AuthorizedRoute>
          }
        />
        <Route path="/admin/venues" element={
          <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
          <VenueListAdmin />
        </AuthorizedRoute>
        }/>
        <Route path="/admin/venues/create" element={
          <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
          <CreateVenue />
        </AuthorizedRoute>
        }/>
        <Route path="/admin/venues/:id" element={
          <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
          <VenueDetailsAdmin />
        </AuthorizedRoute>
        }/>
        <Route path="/admin/services" element={
          <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
          <ServiceListAdmin />
        </AuthorizedRoute>
        }/>
        <Route path="/admin/services/create" element={
          <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
          <CreateService />
        </AuthorizedRoute>
        }/>
        {/* Customer Routes */}
        <Route
          path="/admin/events/update/:eventId"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <UpdateEventAdmin loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />
        <Route
          path="/events/update/:eventId"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <UpdateEventCustomer loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />
        <Route
          path="/events/create"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <CreateEventCustomer loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }
        />
        <Route
          path="/userprofiles"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <UserProfileList />
            </AuthorizedRoute>
          }
        />
        <Route
          path="/userprofiles/:id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <UserProfileDetails />
            </AuthorizedRoute>
          }
        />
        <Route
          path="/venues"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} >
              <VenueList />
            </AuthorizedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} >
              <ServiceList />
            </AuthorizedRoute>
          }
        />
        <Route
          path="/myEvents"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} >
              <MyEventsList loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route
          path="/upcomingEvents"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} >
              <UpcomingEvents loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />

        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
