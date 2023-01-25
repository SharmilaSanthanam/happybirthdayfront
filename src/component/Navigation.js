import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from "react-redux";
import headimage from '../images/happy.png';
import name from '../images/name.jpg';
import './Navigation.css'

function Navigation() {
  const user = useSelector((state) => state.user);

   return (

    <Navbar className="navbar navbar-light" style={{ backgroundColor: "#FFFF00"}} expand="lg">
      <Container className="heading1">
        <LinkContainer to="/">
          <Navbar.Brand style={{ color: "black" }}>
      
       <img className="logo" src= {headimage} alt="HAPPY BIRTHDAY" />
          
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            {!user && (
              <LinkContainer to="/add-wish">
                <Nav.Link><b style={{color: "black"}}>To Wish</b></Nav.Link>
              </LinkContainer>
            )}
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}
export default Navigation