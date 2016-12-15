import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, Button, Glyphicon } from 'react-bootstrap';
import { brandStyle, navbarStyle } from '../styles/Header.style';

export const Header = () => {
  return (
      <Navbar inverse style={ navbarStyle}>
        <Navbar.Header>
          <Navbar.Brand style={ brandStyle }>Armchair Fillosopher</Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem href='http://localhost:8181/auth'>
            <Button bsStyle='info'>
              Log in with Twitter
            </Button>
          </NavItem>
        </Nav>
      </Navbar>
  );
};
