import React, { useState } from 'react';
import './application-style.css';

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
        
                // Additional logic for handling successful response, if needed
                if (formData.is_shelter === true) {
                const tokenResponse = await fetch('http://127.0.0.1:8000/api/token/', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    }),
                });
        
                const tokenData = await tokenResponse.json();
        
                console.log(tokenData);
        
                const accessToken = tokenData.access;
        
                const shelterResponse = await fetch('http://127.0.0.1:8000/accounts/shelter/', {
                    method: 'POST',
                    headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    name: formData.email,
                    }),
                });
        
                // Additional logic for handling the shelter response, if needed
                }
        
                setError('');
                setSuccess('Application submitted successfully!');
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

    return (
    <>  
        {bootstrapCSS}

        <main>
            <div className="container-sm">
                <form className="application-form needs-validation" onSubmit={handleSubmit} noValidate>
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
                                <a href="pet-detail-page.html">Back to Pet Details</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    </>
    );
};

export default Applications;