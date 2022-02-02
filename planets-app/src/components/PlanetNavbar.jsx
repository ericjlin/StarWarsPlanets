import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeBarChartAttribute } from '../state/actions';
import logo from '../Star-wars-logo-new-tall.jpeg';

const PlanetNavbar = () => {
  const dispatch = useDispatch();
  return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <img
              src={logo}
              width="80"
              height="100%"
              style={{
                right: 5,
              }}
              className="d-inline-block align-top"
              alt="Star Wars"
            />
          </Navbar.Brand>
          <Navbar.Brand>Planet Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Set Attribute" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => {
                dispatch(changeBarChartAttribute('population'))
              }}>Population</NavDropdown.Item>
              <NavDropdown.Item onClick={() => {
                dispatch(changeBarChartAttribute('rotation_period'))
              }}>Rotation Period</NavDropdown.Item>
              <NavDropdown.Item onClick={() => {
                dispatch(changeBarChartAttribute('orbital_period'))
              }}>Orbital Period</NavDropdown.Item>
              <NavDropdown.Item onClick={() => {
                dispatch(changeBarChartAttribute('diameter'))
              }}>Diameter</NavDropdown.Item>
              <NavDropdown.Item onClick={() => {
                dispatch(changeBarChartAttribute('surface_water'))
              }}>Surface Water</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default PlanetNavbar;