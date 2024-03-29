import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const CreatePetForm = () => {
const token = localStorage.getItem('access');
const navigate = useNavigate()


  const [formData, setFormData] = useState({
    pet_name: '',
    species: 'dog',
    age: 1,
    breed: '',
    gender: 'male',
    status: 'available',
    behaviour: '',
    health: '',
    description: '',
    pet_picture: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      pet_picture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        data.append(key, value);
      }
   
    });

    
    console.log('Data being sent:', formData); // Log the data before sending

    try {
      const response = await fetch(`http://127.0.0.1:8000/pet_listings/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`, // Add your authentication token if required
          },
        body: data,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Pet listing created:', responseData);
      navigate(`/my_listings`);
      
      // Redirect or perform any other necessary actions upon successful submission
    } catch (error) {
      console.error('Error creating pet listing:', error.message);
      // Handle error appropriately
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <label>
    //     Name:
    //     <input type="text" name="pet_name" value={formData.pet_name} onChange={handleChange} />
    //   </label>
    //   <br />
    //   <label>
    //     Species:
    //     <input type="text" name="species" value={formData.species} onChange={handleChange} />
    //   </label>
    //   <br />
    //   <label>
    //     Description:
    //     <textarea name="description" value={formData.description} onChange={handleChange} />
    //   </label>
    //   <br />
    //   <label>
    //     Picture:
    //     <input type="file" name="picture" onChange={handleFileChange} />
    //   </label>
    //   <br />
    //   <button type="submit">Submit</button>
    // </form>
    //novalidate
    <>
        <div className='container-sm pet-form-bg'>
            <form className="pet-creation needs-validation" onSubmit={handleSubmit}>
                <h2 id="net-pet">Create your pet's profile</h2>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <div className="col-md-8">
                                <label htmlFor="pet-name">Pet Name:</label>
                                <input type="text" value={formData.pet_name} onChange={handleChange} id="validationCustom01" className="form-control" name="pet_name"  required/>
                                <div className="invalid-feedback">Please provide the name of the pet.</div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-8">
                                <label htmlFor="pet-age">Age:</label>
                                <input type="number" min="1" value={formData.age} onChange={handleChange} id="validationCustom02" className="form-control" name="age"  required/>
                                <div className="invalid-feedback">Please provide the age of the pet.</div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-8">
                                <label htmlFor="pet-species">Species:</label>
                                {/* <input type="text" value={formData.species} onChange={handleChange} id="validationCustom01" className="form-control" name="species"  required/> */}
                                <select
                                    className="form-select"
                                    value={formData.species}
                                    onChange={handleChange} 
                                    name='species'
                                    >
                                    <option value="dog">Dog</option>
                                    <option value="cat">Cat</option>
                                    <option value="bird">Bird</option>
                                    <option value="rabbit">Rabbit</option>
                                    </select>
                                <div className="invalid-feedback">Please provide the species of the pet.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-8">
                                <label htmlFor="pet-name">Breed:</label>
                                <input type="text" value={formData.breed} onChange={handleChange} id="validationCustom01" className="form-control" name="breed"  required/>
                                <div className="invalid-feedback">Please provide the breed of the pet.</div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-8">
                                <label htmlFor="pet-gender">Gender:</label>
                                {/* <input type="text" value={formData.gender} onChange={handleChange} id="validationCustom01" className="form-control" name="gender" placeholder=" " required/> */}
                                <select
                                    className="form-select"
                                    value={formData.gender}
                                    onChange={handleChange} 
                                    name='gender'
                                    >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    </select>
                                <div className="invalid-feedback">Please provide the gender of the pet.</div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <div className="col-md-8">
                                <label htmlFor="pet-behavior">Behavior:</label>
                                <input type="text" value={formData.behaviour} onChange={handleChange} id="validationCustom01" className="form-control" name="behaviour" placeholder=" " required/>
                                <div className="invalid-feedback">Please provide the behavior-type of the pet.</div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-8">
                                <label htmlFor="pet-health">Health:</label>
                                <input type="text" value={formData.health} onChange={handleChange} id="validationCustom01" className="form-control" name="health" placeholder=" " required/>
                                <div className="invalid-feedback">Please provide the health of the pet.</div>
                            </div>
                        </div>

                        <div className="form-group col-md-8">
                            <label htmlFor="pet-description">Description:</label>
                            <textarea className="form-control" value={formData.description} onChange={handleChange}  id="pet-description validationCustom01" name="description" rows="3" required></textarea>
                            <div className="invalid-feedback">Please provide a description for the pet.</div>
                          </div>

                          <div className="form-group col-md-8">
                            <label htmlFor="pet-description">Picture:</label>
                            <input className="form-control" onChange={handleFileChange} type="file" name="pet_picture" id="picture validationCustom01" />
                            <div className="invalid-feedback">Please provide a description for the pet.</div>
                          </div>

                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-md-6">
                            <input id="submit-button" type="submit" className="btn btn-success btn-block" name="submit-button" value="Create"/>
                        </div>
    
                        <div className="col-md-8 mt-4">
                            <Link to={`/my_listings`}> Back to my listings </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
            
    </>
    
  );
};

export default CreatePetForm;