import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logOut } from "../features/accounts/accountSlice";
import { RootState } from "../store/store";
import { useAppSelector } from "../store/store";

export default function Header() {
  const dispatch = useDispatch();
  const { user } = useAppSelector(state => state.account);

  return (
    <Navbar className="navbar" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand>
          <NavLink style={{textDecoration: "none", color: "white"}} to="/">R2's Forms</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/createpoll">
              Create Poll
            </NavLink>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link>Welcome {user?.name}</Nav.Link>
                <Button
                  style={{borderRadius: "10px", height: "35px", lineHeight: "18px"}}
                  className="btn btn-outline-dark"
                  onClick={() => dispatch(logOut())}
                  variant="outline-secondary"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <NavLink style={{borderRadius: "10px", height: "35px", lineHeight: "18px"}} className="btn" to="/login">Login</NavLink>
                <NavLink style={{borderRadius: "10px", height: "35px", lineHeight: "18px"}} className="btn" to="/signup">Signup</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
