import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ApplicationsFilled = ({ formData, petDetails }) => {
    const { id } = useParams();

    return (
        <div>
            <h2>Filled Application View</h2>
            <p>Pet Name: {petDetails?.petName}</p>
            <p>Your Age: {formData.age}</p>
            {/* ... */}

            <div className="col-md-8 mt-4">
                <Link to={`/pet_listings/${id}`}>Back to Pet Details</Link>
            </div>
        </div>
    );
};

 export default ApplicationsFilled;