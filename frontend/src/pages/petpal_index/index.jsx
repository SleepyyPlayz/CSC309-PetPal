import React, { useEffect, useState } from 'react';

const PetList = () => {
  console.log('Rendering PetList'); // Add this line

  const [pets, setPets] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [preNextPage, setPreNextPage] = useState(null);

  useEffect(() => {
    // Define the API endpoint for your pets
    const apiUrl = nextPage || 'http://127.0.0.1:8000/pet_listings/';

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
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setPets(prevPets => [...prevPets, ...data.results]);
        setPreNextPage(data.next);
      })
      .catch(error => {
        console.error('Error fetching pets:', error);
      });
  }, [nextPage]); // Run this effect when nextPage changes



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
                <h1 className="fw-light">Welcome to PetPal!</h1>
                <p className="lead text-muted">Our Featured Pets:</p>
              </div>
            </div>
          </section>

          <div>
            <h2>Pet List</h2>
            <ul>
              {pets.map(pet => (
                <li key={pet.id}>{pet.pet_name}</li>
              ))}
            </ul>
            {preNextPage && (
              <button onClick={() => setNextPage(preNextPage)}>
                Load More
              </button>
            )}
          </div>

        </main>
      </body>
    </>
  );
};

export default PetList;
