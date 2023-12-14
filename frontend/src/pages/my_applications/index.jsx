import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyApplications = ({isLoggedIn}) => {
      const shelterId = localStorage.getItem('userId');
      const accessToken = localStorage.getItem('access');
      const isShelter = localStorage.getItem('is_shelter')
      const [applications, setApplications] = useState([]);
      const [nextPage, setNextPage] = useState(null);
      var apiUrl
      if (isShelter === 'false') {
        apiUrl = `http://127.0.0.1:8000/applications/filled-applications/user/list/`;
      } 
      else {
        apiUrl = `http://127.0.0.1:8000/applications/filled-applications/shelter/list/`;
      }
      const [currentPage, setCurrentPage] = useState(apiUrl);
      const [previousPage, setPreviousPage] = useState(null);
      

      useEffect(() => {
        fetch(currentPage, {
            headers: {
             "Authorization": `Bearer ${accessToken}`, },
         })
          .then(response => response.json())
          .then(data => {
            setApplications(data.results);
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

      }, [currentPage]); 

    return (
<>

    <div className="container mt-4">
    <div className="d-flex justify-content-between mt-3 pb-3">
  
    </div>
    <ul className="list-group">
      {applications.map(application => (
        <li key={application.pet.pet_name} className="list-group-item">
            <div className="row align-items-center">
            <div className="col-md-3">
                <p>For pet: </p>
            </div>
            <div className="col-md-3">
                <p>Date Applied: {application.created_at}</p>
            </div>

            <div className="col-md-3">
                <p>Status: {application.status}</p>
            </div>
            <div className="col-md-2">
            <Link className="btn btn-primary" to={`/applications_filled/${application.id}`}>Details</Link>
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
</>)

}
export default MyApplications;