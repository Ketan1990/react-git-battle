import React, { Component } from 'react';
import {Navbar,Nav, NavItem} from 'react-bootstrap';
import { NavLink} from 'react-router-dom';
import style from './CustomNav.scss';

class CustomNav extends Component {
  render() {
    return (
      <div className= {style.NavContainer}>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#brand">React-Bootstrap</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#"> <NavLink exact activeClassName={style.active} to="/">Home </NavLink>  </NavItem>
              <NavItem eventKey={2} href="#"> <NavLink activeClassName={style.active} to="/battle"> Battle </NavLink>  </NavItem>
              <NavItem eventKey={2} href="#"> <NavLink activeClassName={style.active} to="/popular">Popular</NavLink>  </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </div>
      );
    }
}

export default CustomNav;
