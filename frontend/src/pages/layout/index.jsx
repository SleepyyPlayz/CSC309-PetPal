import { Outlet, Link } from "react-router-dom";
import React from 'react';

import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

import logo from '../../assets/logo-with-text-big.png';


const Layout = ({ handleSignOut, isLoggedIn}) => {

  const isShelter = localStorage.getItem('is_shelter') === 'true';

  return (
    /* body container */
    <div className="d-flex flex-column min-vh-100">

      <Navbar expand="lg" className="mb-4 align-items-center">
        <Container fluid="lg">

          <Navbar.Brand href="/"> <img src={logo} alt="logo" height="50" /> </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarNav" />

          <Navbar.Collapse id="navbarNav">
            <div className="ms-auto">
              <Link to="/shelters" className="me-2"><Button variant="primary">Our Shelters</Button></Link>
              { isLoggedIn ? 
                <>
                  <Link to="/blogs" className="me-2"><Button variant="primary">Blogs</Button></Link>

                  {/* New Application to be linked to pet details page */}
                  {/* <Link to="/applications/filled-applications/shelter/list/" className="me-2"><Button variant="primary">Applications</Button></Link> */}

                  <Link to="/user_profile" className="me-2"><Button variant="secondary">Your Profile</Button></Link>
                  <Link to="/my_applications" className="me-2"><Button variant="secondary">My Applications</Button></Link>
                  
                  { isShelter && 
                    <>
                      <Link to="/shelter_profile" className="me-2"><Button variant="secondary">Shelter Profile</Button></Link>
                      <Link to="/my_listings"  className="me-2"><Button variant="secondary">My Listings</Button></Link>
                      <Link to="/my_posts"  className="me-2"><Button variant="secondary">My Blogposts</Button></Link>
                    </>
                  }
                  
                  <Link to="/notifications" className="me-2"><Button variant="outline-info">Notifications</Button></Link>
                  <Button variant="outline-danger" className="me-2" onClick={handleSignOut}>Sign Out</Button>
                </>
                :
                <>
                  <Link to="/signup" className="me-2"><Button variant="secondary">Sign Up</Button></Link>
                  <Link to="/login" className="me-2"><Button variant="outline-secondary">Log In</Button></Link>
                </>
              }
            </div>
          </Navbar.Collapse>

        </Container>
      </Navbar>

      <Outlet />

      <footer className="mt-auto py-4 bg-body-tertiary">
        <Container>
          <p className="mb-1">&copy; PetPal 2023</p>
        </Container>
      </footer>
      
    </div>
  )
};

export default Layout;