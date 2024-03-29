import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { auth, logout } from '../auth/firebase';

const Layout = () => {

  const user = auth.currentUser;

  return (
    <Container fluid>
      <Row>
        <Navbar collapseOnSelect className='navBar' expand="sm md lg" style={{ backgroundColor: 'rgba(235, 234, 230, 0.8)', border: "solid 0.5px #c2c5c6"}} variant="light" fixed="top">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/countries">
                  <Nav.Link>Countries</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/favourites">
                  <Nav.Link>Favourites</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
            {user? 
              <Button style={{ marginLeft: '10px' }} onClick={logout}>Logout</Button> 
                : 
              <LinkContainer  to="/login" style={{ marginLeft: '10px' }}>
                <Button style={{ marginLeft: '10px' }}>Login</Button>
              </LinkContainer>
            }
          </Container>
        </Navbar>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>
  );
};

export default Layout;
