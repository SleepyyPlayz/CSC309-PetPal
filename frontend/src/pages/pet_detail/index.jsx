// src/components/PetDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PetDetail() {
  const [pet, setPet] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/pet_listings/${id}/`
    // axios.get(`http://localhost:8000/api/pets/${id}/`)
    //   .then(response => setPet(response.data))
    //   .catch(error => console.error('Error fetching data:', error));

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setPet(data))
      .catch(error => {
        console.error('Error fetching pets:', error);
      });
  }, [id]);

  const handleApply = () => {
    // Redirect to the application page with the pet ID in the URL
    window.location.href = `/applications/${id}`;
  };

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    // <div>
    //   <h2>{pet.name}</h2>
    //   <p>Species: {pet.species}</p>
    //   <p>Age: {pet.age}</p>
    // </div>
    <>
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Pet Pal Project</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"/>
            <link href="style.css" rel="stylesheet"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        </head>

        <main>
            <div className="container mx-auto align-items-center row row-cols-1 row-cols-md-2 g-4 mt-2 mb-1 mx-5">
                <div className="col">
                    <img src={pet.pet_picture !== null ? `${pet.pet_picture}` : "/no_image.jpg" } alt="Pet Pic" className="img-fluid card" />
                </div>

                <div className="col">
                    <div className="card" >
                        <div className="card-body">
                            <h1 className="card-title">{pet.name}</h1>
                            <p className="card-text">{pet.breed}</p>
                            <p className="card-text">{pet.location}</p>
                            <p className="card-text">
                                {/* <a href="shelter-detail-page.html">Toronto Pet Shelter</a> */}
                                {pet.shelter.name}
                            </p>
                            <p className="card-text">Gender: {pet.gender}</p>
                            <p className="card-text">Age: {pet.age} years old</p>
                            <p className="card-text">Behavior: Not in model yet</p>
                            <p className="card-text">Health: Not in model yet</p>

                            <p className="card-text">Description:
                                Not in model yet
                            </p>
                            <p className="card-text">Adoption fee: not in model yet</p>
                            <button onClick={handleApply} className="btn btn-lg adopt-button">Apply for Adoption</button>

                            {/* <a href="pet-adoption-form.html" className="btn btn-lg adopt-button">Adopt Me!</a> */}
                        </div>
                    </div>
                </div>

            </div>
        </main>
    
    
    </>
  );
}

export default PetDetail;