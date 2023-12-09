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
    <div className="container mt-4">
    <div className="d-flex justify-content-between mt-3 pb-3">
    <Link to={`/create_pet_listing/`} className="btn btn-primary">
      Create a New Pet Listing
    </Link>
  
    </div>
    <ul className="list-group">
      {listings.map(listing => (
        <li key={listing.id} className="list-group-item">
            <div className="row align-items-center">
                <div className="col-md-4">
            <img className="img-fluid img-thumbnail" style={{ width: '200px', height: '200px' }} src={listing.pet_picture}></img>
            </div>
            <div className="col-md-3">
            {listing.pet_name}
            </div>
            <div className="col-md-2">
            <Link className="btn btn-primary" to={`/update_pet_listing/${listing.id}`}>Update</Link>
            </div>
           
         
       
            </div>
        </li>
      ))}
    </ul>
    <div className="d-flex justify-content-between mt-3">
      {previousPage && (
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentPage(previousPage)}
        >
          Previous Page
        </button>
      )}
      {nextPage && (
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentPage(nextPage)}
        >
          Next Page
        </button>
      )}
    </div>
  </div>
        
        {/* <div className="container mt-4">
          <div >
            <Link to={`/create_pet_listing/`} className="btn" >Create Pet Listing </Link>
            {listings.map(listing => (
              <div>
                <li key={listing.id}>{listing.pet_name}</li>
                <Link to={`/update_pet_listing/${listing.id}`} className="btn btn-sm btn-outline-info me-3">Update</Link>
              <li key={listing.id} className="list-group-item">
            <div className="row align-items-center">
                <div className="col-md-4">
            <img className="img-fluid img-thumbnail" style={{ width: '200px', height: '200px' }} src={listing.pet_picture}></img>
            </div>
            <div className="col-md-3">
            {listing.pet_name}
            </div>
            <div className="col-md-2">
            <Link className="btn btn-primary" to={`/update_pet_listing/${listing.id}`}>Update</Link>
            </div>
            </div>
        </li>
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
        </div> */}
    
    </>
    );

}
export default MyListings;