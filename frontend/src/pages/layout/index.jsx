import { Outlet, Link } from "react-router-dom";
import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import logo from '../../assets/logo-with-text-big.png';


const Layout = ({ handleSignOut, isLoggedIn}) => {

  const isShelter = localStorage.getItem('is_shelter') === 'true';

  return (
    /* body container */
    <div className="d-flex flex-column min-vh-100">  

      <Navbar expand="lg" className="mb-4 align-items-center">
        <Container fluid="lg">

          <Navbar.Brand href="/">
            <img src={logo} alt="logo" height="50" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarNav" />

          <Navbar.Collapse id="navbarNav">

            <Form className="mx-auto d-flex flex-row">

              <Form.Select className="me-2" name="species">
                <option selected value="0">Species</option>
                <option value="1">Dog</option>
                <option value="2">Cat</option>
                <option value="3">Other</option>
              </Form.Select>

              <Form.Select className="me-2" name="age">
                <option selected value="0">Age</option>
                <option value="1">&lt; 1 year</option>
                <option value="2">&gt;= 1 year</option>
              </Form.Select>

              <Form.Select className="me-2" name="sort-order">
                <option selected value="0">Sort By</option>
                <option value="1">Age</option>
                <option value="2">Recent</option>
              </Form.Select>

              <Button variant="secondary" type="submit">Search</Button>
            </Form>

            <div>
              { isLoggedIn ? 
                <>
                  <Link to="/blogs" className="me-2"><Button variant="primary">Blogs</Button></Link>
                  <Link to="/user_profile" className="me-2"><Button variant="secondary">Your Profile</Button></Link>
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
          <Link to="/">Shelter Log In</Link>
        </Container>
      </footer>

    </div>
  )

    /*
    <>
      <nav>
        <ul>
         
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/shelters">Shelters</Link>
          </li>
       
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/blogs">Blogs</Link>
              </li>
              <li>
                <Link to="/user_profile">User Profile</Link>
              </li>
              {isShelter && (
                <>
                <li>
                  <Link to="/shelter_profile">Shelter Profile</Link>
                </li>

                <li>
                  <Link to="/my_listings">My Listings</Link>
                </li>

                <li>
                  <Link to="/my_posts">My Blogposts</Link>
                </li>
                </>
              )}
                <li>
                <button onClick={handleSignOut}>Sign Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Outlet />
    </>
    */
};

export default Layout;