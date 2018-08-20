import React, { Component } from 'react';
import {Navbar,Nav, NavItem} from 'react-bootstrap';
import { NavLink} from 'react-router-dom';

class CustomNav extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">React-Bootstrap</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#"> <NavLink exact activeClassName="active" to="/">Home </NavLink>  </NavItem>
            <NavItem eventKey={2} href="#"> <NavLink activeClassName="active" to="/battle"> Battle </NavLink>  </NavItem>
            <NavItem eventKey={2} href="#"> <NavLink activeClassName="active" to="/popular">Popular</NavLink>  </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      );
    }
}

export default CustomNav;
