import React from 'react';
import { useState, useEffect } from 'react';
// import './applications-style.css';
import { useParams, useNavigate } from 'react-router-dom';

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

    const [petDetails, setPetDetails] = useState({
        petName: '',
    });
    const [petName, setPetName] = useState('');
    const accessToken = localStorage.getItem('access');
    const userId = localStorage.getItem('userId');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplicationData = async () => {
            console.log(id);
                try {
                    const response = await fetch(`http://127.0.0.1:8000/applications/filled-applications/user/${id}/`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                        }
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const applicationData = await response.json();
                    console.log(applicationData);
                    setFormData(applicationData);
                } catch (error) {
                console.error('Error fetching application data:', error);
                }
        }
    
        fetchApplicationData();
    }, [id]);

    // useEffect(() => {
    //     const fetchPetDetails = async () => {
    //         try {
    //             if (formData.pet) {
    //                 console.log(formData.pet);
    //                 const response = await fetch(`http://127.0.0.1:8000/pet_listings/${formData.pet}/`);
    //                 if (response.ok) {
    //                     const petData = await response.json();
    //                     setPetDetails(petData);
    //                     console.log(petData);
    //                 } else {
    //                     // Handle error response
    //                 }
    //             }
    //         } catch (error) {
    //             console.error('Error fetching pet details:', error);
    //         }
    //     };
    
    //     fetchPetDetails();
    // }, [formData.pet]);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('Data being sent:', formData); // Log the data before sending
        try {
            const response = await fetch(`http://127.0.0.1:8000/applications/${id}/`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Add your authentication token if required
                },
                body: formData,
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const responseData = await response.json();
            console.log('Pet listing updated:', responseData);
            navigate(`/Applications_list/`);
            
            // Redirect or perform any other necessary actions upon successful submission
            } catch (error) {
            console.error('Error creating pet listing:', error.message);
            // Handle error appropriately
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
                    <h2>Application Status:</h2>
                <div className="btn btn-primary disabled">Status: {formData.status}</div>
                </div>
    
                {/* <FormField label="Name of the pet you want to adopt:" value={petName} disabled /> */}
                <FormField label="Your age:" value={formData.age} disabled />
                <FormField label="Do you live in a house, apartment, or condo?" value={formData.accommodation} disabled />
                <FormField label="Do you rent or own your home?" value={formData.rent_own_or} disabled />
                <FormField label="Do you have permission to keep pets?" value={formData.has_permission_to_keep_pets} disabled />
                <FormField label="Have you owned any pets? If yes, what are your past experiences with taking care of pets." value={formData.previous_pets} disabled />
                <FormField label="How many hours are you available to spend with a pet per day?" value={formData.hours_available_for_pet} disabled />

                
                </div>
            </div>
            </form>
        </div>
    );
};
  

export default ApplicationsFilled;