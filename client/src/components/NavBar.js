import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
Button,
Collapse,
Nav,
NavLink,
NavItem,
Navbar,
NavbarBrand,
NavbarToggler,
} from "reactstrap";
import { logout } from "./managers/authManager";
import './styles/NavBar.css';
export default function NavBar({ loggedInUser, setLoggedInUser }) {
const [open, setOpen] = useState(false);

const toggleNavbar = () => setOpen(!open);
const isAdmin = loggedInUser && loggedInUser.roles.includes('Admin');

return (
    <div>
    <Navbar className="navbar-background" light fixed="true" expand="lg">
        <NavbarBrand id="navBrand" className="mr-auto"  tag={RRNavLink} to="/">
        Rasket's Rime
        </NavbarBrand>
        {loggedInUser ? (
        <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
            <Nav navbar>
                {loggedInUser && (
                    <>
                    {isAdmin && (
                        <NavItem >
                            <NavLink className="nav_bar_link" tag={RRNavLink} to="/admin/events">
                            Dashboard
                            </NavLink>
                        </NavItem>
                    )}
                    <NavItem >
                            <NavLink className="nav_bar_link" tag={RRNavLink} to="/upcomingEvents">
                            Events
                            </NavLink>
                        </NavItem>
                        <NavItem >
                            <NavLink className="nav_bar_link" tag={RRNavLink} to="/venues">
                            Venues
                            </NavLink>
                        </NavItem>
                        <NavItem >
                            <NavLink className="nav_bar_link" tag={RRNavLink} to="/services">
                            Services
                            </NavLink>
                        </NavItem>
                        <NavItem >
                            <NavLink className="nav_bar_link" tag={RRNavLink} to="/myEvents">
                            My Events
                            </NavLink>
                        </NavItem>
                        <NavItem >
                            <NavLink className="nav_bar_link" tag={RRNavLink} to="/events/create">
                            Add An Event
                            </NavLink>
                        </NavItem>
                    </>
                )}
            </Nav>
            </Collapse>
            <Button
            className="nav_btn_background"
            onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                setLoggedInUser(null);
                setOpen(false);
                });
            }}
            >
            Logout
            </Button>
        </>
        ) : (
        <Nav navbar>
            <NavItem>
            <NavLink tag={RRNavLink} to="/login">
                <Button className="nav_btn_background" color="primary">Login</Button>
            </NavLink>
            </NavItem>
        </Nav>
        )}
    </Navbar>
    </div>
);
}