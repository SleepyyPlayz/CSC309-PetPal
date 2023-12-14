import React from 'react';
import { useState, useEffect } from 'react';
// import './applications-style.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const FormField = ({ label, value, disabled }) => {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input type="text" className="form-control" value={value} disabled={disabled} />
        <div className="invalid-feedback">
          Please enter {label.toLowerCase()}.
        </div>
      </div>
    );
};


const ApplicationsFilled = () => {
    const [formData, setFormData] = useState({
        pet: '',
        age: '',
        accommodation: '',
        rent_own_or: '',
        has_permission_to_keep_pets: false,
        previous_pets: '',
        hours_available_for_pet: '',
        status: '',
    });

    const accessToken = localStorage.getItem('access');
    const userId = localStorage.getItem('userId');
    const isShelter = localStorage.getItem('is_shelter');
    const { id } = useParams();

    const [dropdownStatus, setDropdownStatus] = useState('');
  

    useEffect(() => {
        const fetchApplicationData = async () => {
            console.log(id);
                try {
                    let endpoint;
                    if (isShelter == 'true') {
                        endpoint = `http://127.0.0.1:8000/applications/filled-applications/shelter/${id}/`;
                    } else {
                        endpoint = `http://127.0.0.1:8000/applications/filled-applications/user/${id}/`;
                    }
                    const response = await fetch(endpoint, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                        }
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const applicationData = await response.json();

                    setDropdownStatus(applicationData.status);
                    setFormData(applicationData);
                } catch (error) {
                console.error('Error fetching application data:', error);
                }
        }
    
        fetchApplicationData();
    }, [userId, id, isShelter, accessToken]);

    const [petName, setPetName] = useState('');

    useEffect(() => {
        const fetchPetDetails = async () => {
            if (formData.pet) {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/pet_listings/${formData.pet}/`);
                    if (response.ok) {
                        const petData = await response.json();
                        console.log(petData);

                        setFormData(prevFormData => ({
                            ...prevFormData,
                            pet: petData.id,
                        }));

                        setPetName(petData.pet_name);
                        console.log(petName)

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
    }, [formData.pet]);

    const handleStatusChange = (e) => {
        setDropdownStatus(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('Data being sent:', formData); // Log the data before sending
        try {
            let endpoint;
            console.log(isShelter);
            if (isShelter == 'true') {
                endpoint = `http://127.0.0.1:8000/applications/filled-applications/shelter/${id}/`;
            } else {
                endpoint = `http://127.0.0.1:8000/applications/filled-applications/user/${id}/`;
            }
            const response = await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: dropdownStatus }),
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const responseData = await response.json();
            console.log('Pet listing updated:', responseData);
            } catch (error) {
            console.error('Error creating application status:', error.message);
        }
      };

    return (
        <div className="container-sm">
            <form className="application-form needs-validation" action="pet-adoption-update-page.html" method="post" noValidate>
            <div className="row">
                <div className="text-left">
                <h3>Pet Adoption Application Form</h3>
                <h6>
                    Thank you for submitting the application form for adoption! You can check on this page for the status of your application.
                </h6>
                </div>
                <div className="col">
                <div className="col mx-auto justify-content-center">
                    <h2>Application Status: {formData.status}</h2>
                        {/* Dropdown for changing the status */}
                        <select
                            className="form-control"
                            id="status"
                            name="status"
                            value={dropdownStatus}
                            onChange={handleStatusChange}
                        >
                            {/* Render different options based on user type */}
                            {(isShelter == 'true') ? (
                                <>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="denied">Denied</option>
                                </>
                            ) : (
                                <>
                                <option value="pending">Pending</option>
                                <option value="withdrawn">Withdrawn</option>
                                </>
                            )}
                        </select>
                </div>
                {/* <FormField label="Name of the pet you want to adopt:" value={petName} disabled /> */}
                <FormField label="Pet Name:" value={petName} disabled />
                <FormField label="Your age:" value={formData.age} disabled />
                <FormField label="Do you live in a house, apartment, or condo?" value={formData.accommodation} disabled />
                <FormField label="Do you rent or own your home?" value={formData.rent_own_or} disabled />
                <FormField label="Do you have permission to keep pets?" value={formData.has_permission_to_keep_pets} disabled />
                <FormField label="Have you owned any pets? If yes, what are your past experiences with taking care of pets." value={formData.previous_pets} disabled />
                <FormField label="How many hours are you available to spend with a pet per day?" value={formData.hours_available_for_pet} disabled />
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-md-6">
                    {/* Button to submit the form and update the status */}
                    <button type="submit" className="btn btn-success btn-block" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
            </form>
            <Link to={`/application_comments/${formData.id}`} className="btn btn-sm btn-outline-primary me-3" >Comments </Link>
        </div>
    );
};
  

export default ApplicationsFilled;