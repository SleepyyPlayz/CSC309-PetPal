import { Outlet, Link } from "react-router-dom";
import React from 'react';

const Layout = ({ handleSignOut, isLoggedIn}) => {
  const isShelter = localStorage.getItem('is_shelter') === 'true';
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
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
                <Link to="/applications">Applications</Link>
              </li>
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
  )
};

export default Layout;