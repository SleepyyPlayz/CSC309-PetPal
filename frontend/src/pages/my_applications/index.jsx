import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyApplications = ({isLoggedIn}) => {
    const shelterId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('access');
    const isShelter = localStorage.getItem('is_shelter')
    const [applications, setApplications] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [petNames, setPetNames] = useState({});
    var apiUrl
    if (isShelter === 'false') {
      apiUrl = `http://127.0.0.1:8000/applications/filled-applications/user/list/`;
    } 
    else {
      apiUrl = `http://127.0.0.1:8000/applications/filled-applications/shelter/list/`;
    }
    const [currentPage, setCurrentPage] = useState(apiUrl);
    const [previousPage, setPreviousPage] = useState(null);
    const [filterCriteria, setFilterCriteria] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');
    

    
    const fetchApplications = async () => {
      try {
        const response = await fetch(`${currentPage}?status=${filterCriteria}&ordering=${sortCriteria}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setApplications(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous || null);

        const petNamePromises = data.results.map((application) => fetchPetName(application.pet));
        const petNamesData = await Promise.all(petNamePromises);
        const petNamesMap = {};
        data.results.forEach((application, index) => {
          const petName = petNamesData[index];
          petNamesMap[application.id] = petName;
        });
        setPetNames(petNamesMap);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
  
    const fetchPetName = async (petId) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/pet_listings/${petId}/`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const petData = await response.json();
        return petData.pet_name;
      } catch (error) {
        console.error('Error fetching pet details:', error);
        return null;
      }
    };

    useEffect(() => {
      fetchApplications();
    }, [currentPage, accessToken, filterCriteria, sortCriteria]);

    const handleFilterChange = (e) => {
      setFilterCriteria(e.target.value);

    };
  
    const handleSortChange = (e) => {
      setSortCriteria(e.target.value);
    };
    
    return (
<>

    <div className="container mt-4">
    <div className="d-flex justify-content-between mt-3 pb-3">
      {/* Add filtering and sorting controls */}
      <div>
        <label>
          Filter by Status:
          <select value={filterCriteria} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
            <option value="withdrawn">Withdrawn</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Sort by:
          <select value={sortCriteria} onChange={handleSortChange}>
            <option value="">Default</option>
            <option value="created_at">Creation Time</option>
            <option value="-updated_at">Last Update Time (Descending)</option>
            <option value="updated_at">Last Update Time (Ascending)</option>
          </select>
        </label>
      </div>
    </div>
    <ul className="list-group">
      {applications.map((application) => (
        <li key={application.pet.pet_name} className="list-group-item">
            <div className="row align-items-center">
            <div className="col-md-3">
                <p>For pet: {petNames[application.id]}</p>
            </div>
            <div className="col-md-3">
                <p>Date Applied: {new Date(application.created_at).toISOString().split('T')[0]}</p>
            </div>
            <div className="col-md-3">
                <p>Status: {application.status}</p>
            </div>
            <div className="col-md-2">
            <Link className="btn btn-primary mb-2 me-2" to={`/applications_filled/${application.id}`}>Details</Link>
            <Link className="btn btn-info" to={`/application_comments/${application.id}`}>Comments</Link>
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