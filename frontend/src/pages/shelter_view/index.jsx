// src/components/PetDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ShelterView( {isLoggedIn} ) {
  const [pet, setPet] = useState(null);
  const { id } = useParams();
  var accessToken;

  useEffect(() => {
    if (isLoggedIn) {
        accessToken = localStorage.getItem('access');
    }
    else {
        window.location.href = '/login';
    }
    
    const apiUrl = `http://127.0.0.1:8000/accounts/shelter/${id}/`
    // axios.get(`http://localhost:8000/api/pets/${id}/`)
    //   .then(response => setPet(response.data))
    //   .catch(error => console.error('Error fetching data:', error));
    console.log(accessToken);
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
      .then(response => response.json())
      .then(data => setPet(data))
      .catch(error => {
        console.error('Error fetching pets:', error);
      });
  }, [id]);

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

        <main>
            <div className="container mx-auto align-items-center row row-cols-1 row-cols-md-2 g-4 mt-2 mb-1 mx-5">
                <div className="col">
                    <img src={pet.profile_picture!== null ? `${pet.profile_picture}` : "/no_image.jpg" } alt="Pet Pic" className="img-fluid card" />
                </div>

                <div className="col">
                    <div className="card" >
                        <div className="card-body">
                            <h1 className="card-title">{pet.name}</h1>
                            <p className="card-text">{pet.address_line_1}</p>
                            <p className="card-text">{pet.address_line_2}</p>
                            <p className="card-text">
                                {/* <a href="shelter-detail-page.html">Toronto Pet Shelter</a> */}
                                {pet.postal_code}
                            </p>
                      

                            {/* <a href="pet-adoption-form.html" className="btn btn-lg adopt-button">Adopt Me!</a> */}
                        </div>
                    </div>
                </div>

            </div>
        </main>
    
    
    </>
  );
}

export default ShelterView;