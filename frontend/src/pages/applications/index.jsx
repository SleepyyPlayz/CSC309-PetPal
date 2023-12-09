import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './application-style.css';
import ApplicationsFilled from '../applications_filled/index.jsx'

const Applications = ({IsLoggedIn}) => {
    const [formData, setFormData] = useState({
        pet: '',
        age: '',
        accommodation: '',
        rent_own_or: '',
        has_permission_to_keep_pets: false,
        previous_pets: '',
        hours_available_for_pet: '',
    });

    const navigate = useNavigate();
    const { id } = useParams();
    console.log('ID from useParams:', id);

    const accessToken = localStorage.getItem('access');
    const userId = localStorage.getItem('userId');
      
    useEffect(() => {
        const fetchPetDetails = async () => {
            if (id) {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/pet_listings/${id}/`);
                    if (response.ok) {
                        const petData = await response.json();
                        console.log(petData);
                        setFormData(formData => ({
                            ...formData,
                            pet: petData.id,
                        }));
                        console.log(formData);
                    } else {
                        // Handle error response
                    }
                } catch (error) {
                    console.error('Error fetching pet details:', error);
                }
                
            }
        };

        fetchPetDetails();
    }, [id, navigate]);


    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormData({
            ...formData,
            [event.target.name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        var skipFlag = false;

        try {
            const response = await fetch('http://127.0.0.1:8000/applications/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(formData)
            });
        
            if (response.ok) {
                skipFlag = true;

                setError('');
                setSuccess('Application submitted successfully!');
                
                const responseData = await response.json();
                const newApplicationId = responseData.id;

                navigate(`/applications_filled/${newApplicationId}`);

            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Something went wrong');
                setSuccess('');
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            setError('Something went wrong');
            setSuccess('');
        }

    };

    const bootstrapCSS = (
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
            crossOrigin="anonymous"
        />
    );

    // const petName = formData.pet && formData.pet.pet_name;
    
    console.log(formData);
    return (
    <>  
        {bootstrapCSS}

        <main>
            <div className="container-sm">
            {success ? (
                <ApplicationsFilled formData={formData} id={id}/>
            ) : (
                <form className="application-form" onSubmit={handleSubmit} noValidate>
                <div class="text-left">
                        <h3>Pet Adoption Application Form</h3>
                        <h6>
                        Thank you for your interest in adopting a pet!
                        Please fill out the application form below and we update your status on the application page. 
                        </h6>
                </div>
                <div className="col">
                    <div className="form-group">
                        <label>The pet you are applying for is: </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">Your age:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="age"
                            name="age"
                            placeholder=" "
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">Please enter your age.</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="accommodation">Do you live in a house, apartment, or condo?</label>
                        <select
                            className="form-control"
                            id="accommodation"
                            name="accommodation"
                            value={formData.accommodation}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select an option</option>
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="condo">Condo</option>
                        </select>
                        <div className="invalid-feedback">Please select one of the options.</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="rent_own_or">Do you rent or own your home?</label>
                        <select
                            className="form-control"
                            id="rent_own_or"
                            name="rent_own_or"
                            value={formData.rent_own_or}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select an option</option>
                            <option value="rent">Rent</option>
                            <option value="own">Own</option>
                        </select>
                        <div className="invalid-feedback">Please enter whether you rent or own where you are currently living.</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="has_permission_to_keep_pets">Do you have permission to keep pets?</label>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="has_permission_to_keep_pets"
                            name="has_permission_to_keep_pets"
                            checked={formData.has_permission_to_keep_pets}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="previous_petse">Have you owned any pets? If yes, what are your past experiences with taking care of pets.</label>
                        <textarea
                            className="form-control"
                            id="previous_pets"
                            name="previous_pets"
                            placeholder=" "
                            value={formData.previous_pets}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <div className="invalid-feedback">Please enter whether you have previously owned or taken care of pets.</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="hours_available_for_pet">How many hours are you available to spend with a pet per day?</label>
                        <input
                            type="number"
                            className="form-control"
                            id="hours_available_for_pet"
                            name="hours_available_for_pet"
                            placeholder=" "
                            value={formData.hours_available_for_pet}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">Please enter the number of hours available for a pet.</div>
                    </div>
                </div>

                <div className="form-group">
                        <div className="row">
                            <div className="col-md-6">
                                <button type="submit" className="btn btn-success btn-block">Submit</button>
                            </div>

                            <div className="col-md-8 mt-4">
                                <Link to={`/pet_listings/${id}`}>Back to Pet Details</Link>
                            </div>
                        </div>
                    </div>
                </form>
            )}
            </div>
        </main>
    </>
    );
};

export default Applications;