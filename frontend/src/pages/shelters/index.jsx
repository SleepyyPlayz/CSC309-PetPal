import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



const ShelterList= () => {
  const navigate = useNavigate()
  const [pets, setPets] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(`http://127.0.0.1:8000/accounts/shelters/`);
  const [previousPage, setPreviousPage] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [queryParams, setQueryParams] = useState('');



  useEffect(() => {

    // Uncomment the following lines if you are using Axios
    /*
    axios.get(apiUrl)
      .then(response => {
        setPets(prevPets => [...prevPets, ...response.data.results]);
        setNextPage(response.data.next);
      })
      .catch(error => {
        console.error('Error fetching pets:', error);
      });
    */

    // Using the Fetch API
    fetch(currentPage)
      .then(response => response.json())
      .then(data => {
        setPets(data.results);
        setNextPage(data.next);
        if (data.hasOwnProperty('previous')){
          setPreviousPage(data.previous);
        } else {
          setPreviousPage(null);
        }
        navigate(`?page=${pageNum}&${queryParams.toString()}`);
      })
      .catch(error => {
        console.error('Error fetching pets:', error);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]); // Run this effect when nextPage changes

  return (
    // <>
    //   <h1>Welcome to PetPal!</h1>   
    // </>
    <>
      <body className="d-flex flex-column min-vh-100">
        <main className="mb-5">
          <section className="py-1 text-center container">
            <div className="row">
              <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">Shelters</h1>
                <p className="lead text-muted">All Shelters:</p>
              </div>
            </div>
          </section>

          

          <div className="album py-1">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {pets.map(pet => (
                  // <li key={pet.id}>{pet.pet_name}</li>
                  <div className="col">
                    <div className="card shadow-sm">
                      <img className="card-img-top" width="100%" src={pet.profile_picture !== null ? `${pet.profile_picture}` : "/no_image.jpg" } alt="Shelter Pic"/>
                      <div className="card-body">
                        <h5 className="card-title">{pet.name}</h5>
                        <p className="card-text">{pet.address_line_1} - {pet.address_line_2} - {pet.postal_code}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          {/* <a className="btn btn-sm btn-outline-info me-3" href="pet-detail-page.html">Details</a> */}
                          <Link to={`/shelter_view/${pet.underlying_user}`} className="btn btn-sm btn-outline-info me-3">Details</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
          
          {nextPage && (
              <button onClick={() => {
                setPageNum(pageNum + 1);
                setCurrentPage(nextPage);
                }}>
                Next Page
              </button>
            )}
          
          {previousPage && (
              <button onClick={() => {
                setPageNum(pageNum - 1);
                setCurrentPage(previousPage);
                }}>
                Previous Page
              </button>
            )}

            <p>{pageNum}</p>

        </main>
      </body>
    </>
  );
};

export default ShelterList;
