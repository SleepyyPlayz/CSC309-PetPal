import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const MyListings = ({isLoggedIn}) => {

    const id = localStorage.getItem('userId');
    const [listings, setListings] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(`http://127.0.0.1:8000/pet_listings/?shelter=${id}`);
    const [previousPage, setPreviousPage] = useState(null);


    useEffect(() => {

        // Using the Fetch API
        fetch(currentPage)
          .then(response => response.json())
          .then(data => {
            setListings(data.results);
            setNextPage(data.next);
            if (data.hasOwnProperty('previous')){
              setPreviousPage(data.previous);
            } else {
              setPreviousPage(null);
            }
          })
          .catch(error => {
            console.error('Error fetching shelters:', error);
          });

      }, [currentPage]); // Run this effect when currentPage changes

    return (
    <>
        
        <div>
            <Link to={`/create_pet_listing/`} className="btn" >Create Pet Listing </Link>
            {listings.map(listing => (
              <div>
                <li key={listing.id}>{listing.pet_name}</li>
                <Link to={`/update_pet_listing/${listing.id}`} className="btn btn-sm btn-outline-info me-3">Update</Link>
              </div>
                  
                  
                ))}

                {nextPage && (
              <button onClick={() => {
                setCurrentPage(nextPage);
                }}>
                Next Page
              </button>
            )}
          
          {previousPage && (
              <button onClick={() => {
                setCurrentPage(previousPage);
                }}>
                Previous Page
              </button>
            )}

        </div>
    
    </>
    );

}
export default MyListings;