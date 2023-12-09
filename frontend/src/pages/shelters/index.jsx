import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



const ShelterList= () => {
  const navigate = useNavigate()
  const [pets, setPets] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(`http://127.0.0.1:8000/pet_listings/`);
  const [previousPage, setPreviousPage] = useState(null);
  const [filterValues, setFilterValues] = useState({
    shelter: '',
    status: '',
    breed: '',
    species: '',
    age: '',
    ordering: '',
  });
  const [shelters, setShelters] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [queryParams, setQueryParams] = useState('');

  const handleFilterChange = (filter, value) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [filter]: value,
    }));
  };

  useEffect(() => {
    // Fetch the list of shelters
    fetch('http://127.0.0.1:8000/accounts/shelters/?limit=100')  // Replace with your actual endpoint
      .then((response) => response.json())
      .then((data) => {
        setShelters(data.results);
      })
      .catch((error) => {
        console.error('Error fetching shelters:', error);
      });
  }, []);



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
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PetPal</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>

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

          <div className="container">
            <div className="row justify-content-center">
                <form>
                    <label className="form-label ms-3">
                      Shelter:
                      <select
                        className="form-select mb-3"
                        value={filterValues.shelter}
                        onChange={(e) => handleFilterChange('shelter', e.target.value)}
                      >
                        <option value="">Select a shelter</option>
                        {shelters.map((shelter) => (
                          <option key={shelter.underlying_user} value={shelter.underlying_user}>
                            {shelter.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  

                  <label className="form-label ms-3">
                    Status:
                    <select
                      className="form-select mb-3"
                      value={filterValues.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="available">Available</option>
                      <option value="adopted">Adopted</option>
                      <option value="pending">Pending</option>
                      <option value="withdrawn">Withdrawn</option>

                    </select>
                  </label>

                  <label className="form-label ms-3">
                    Breed:
                    <input
                      type="text"
                      className="form-control"
                      value={filterValues.breed}
                      onChange={(e) => handleFilterChange('breed', e.target.value)}
                    />
                  </label>

                  <label className="form-label ms-3">
                    Species:
                    <select
                      className="form-select"
                      value={filterValues.species}
                      onChange={(e) => handleFilterChange('species', e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="dog">Dog</option>
                      <option value="cat">Cat</option>
                      <option value="bird">Bird</option>
                      <option value="rabbit">Rabbit</option>
                    </select>
                  </label>

                  <label className="form-label ms-3">
                    Age:
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      value={filterValues.age}
                      onChange={(e) => handleFilterChange('age', e.target.value)}
                    />
                  </label>

                  <label className="form-label ms-3">
                    Ordering:
                    <select
                      className="form-select"
                      value={filterValues.ordering}
                      onChange={(e) => handleFilterChange('ordering', e.target.value)}
                    >
                      <option value="">None</option>
                      <option value="age">Age</option>
                      <option value="pet_name">Pet Name</option>
                    </select>
                  </label>



                  {/* Add similar select elements for other filters (breed, age, ordering) */}
                  
                  <button
                    className='ms-3'
                    type="button"
                    onClick={() => {
                      const currentQueryParams = new URLSearchParams(filterValues);
                      const newUrl = `http://127.0.0.1:8000/pet_listings/?${currentQueryParams.toString()}`;
                      setQueryParams(currentQueryParams.toString());
                      setPageNum(1);
                      setCurrentPage(newUrl);
                      console.log("just did the button");

                    }}
                  >
                    Apply Filters
                  </button>
                </form>

            </div>
          </div>

          

          <div className="album py-1">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {pets.map(pet => (
                  // <li key={pet.id}>{pet.pet_name}</li>
                  <div className="col">
                    <div className="card shadow-sm">
                      <img className="card-img-top" width="100%" src={pet.pet_picture !== null ? `${pet.pet_picture}` : "/no_image.jpg" } alt="Pet Pic"/>
                      <div className="card-body">
                        <h5 className="card-title">{pet.pet_name}</h5>
                        <p className="card-text">{pet.breed} - {pet.gender} - {pet.age} years old</p>
                        <div className="d-flex justify-content-between align-items-center">
                          {/* <a className="btn btn-sm btn-outline-info me-3" href="pet-detail-page.html">Details</a> */}
                          <Link to={`/pet_listings/${pet.id}`} className="btn btn-sm btn-outline-info me-3">Details</Link>
                          <small className="text-muted">{pet.shelter.name}</small>
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
