import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './application-style.css';
import ApplicationsFilled from '../applications_filled/index.jsx'

const Applications = () => {

    const [formData, setFormData] = useState({
        petName: '',
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        age: '',
        accommodation: '',
        rentOwnOr: '',
        hasPermissionToKeepPets: false,
        previousPets: '',
        hoursAvailableForPet: '',
    });

    const navigate = useNavigate();
    const { id } = useParams();
    console.log('ID from useParams:', id);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState('');
      
    useEffect(() => {
        const fetchPetDetails = async () => {
            console.log(id);
            if (id) {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/pet_listings/${id}/`);
                    if (response.ok) {
                        const petData = await response.json();
                        console.log(petData);
                        setFormData(prevData => ({
                            ...prevData,
                            petName: petData.petName,
                        }));
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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/accounts/user/', {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                });
    
                if (response.ok) {
                    const userData = await response.json();
    
                    // Update form state with user information
                    setFormData(prevData => ({
                        ...prevData,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        address: userData.address,
                        email: userData.email,
                    }));
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        if (isLoggedIn) {
            fetchUserData();
        } else {
            console.log("Invalid token or user not logged in");
        }
    }, [isLoggedIn, accessToken]);

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
                },
                body: JSON.stringify(formData),
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
    console.log(formData);
    return (
    <>  
        {bootstrapCSS}

        <main>
            <div className="container-sm">
            {success ? (
                <ApplicationsFilled formData={formData} id={id}/>
            ) : (
                <form className="application-form needs-validation" onSubmit={handleSubmit} noValidate>
                <div className="col">
                    
                    <div className="form-group">
                        <label>The pet you are applying for is: {formData.petName}</label>
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
                        <label htmlFor="rentOwnOr">Do you rent or own your home?</label>
                        <select
                            className="form-control"
                            id="rentOwnOr"
                            name="rentOwnOr"
                            value={formData.rentOwnOr}
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
                        <label htmlFor="hasPermissionToKeepPets">Do you have permission to keep pets?</label>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="hasPermissionToKeepPets"
                            name="hasPermissionToKeepPets"
                            checked={formData.hasPermissionToKeepPets}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="previousPets">Have you owned any pets? If yes, what are your past experiences with taking care of pets.</label>
                        <textarea
                            className="form-control"
                            id="previousPets"
                            name="previousPets"
                            placeholder=" "
                            value={formData.previousPets}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <div className="invalid-feedback">Please enter whether you have previously owned or taken care of pets.</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="hoursAvailableForPet">How many hours are you available to spend with a pet per day?</label>
                        <input
                            type="number"
                            className="form-control"
                            id="hoursAvailableForPet"
                            name="hoursAvailableForPet"
                            placeholder=" "
                            value={formData.hoursAvailableForPet}
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