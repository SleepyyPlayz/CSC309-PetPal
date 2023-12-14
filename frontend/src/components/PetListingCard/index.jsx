import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export default function PetListingCard ({ pet }) {
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Card.Title>{pet.pet_name}</Card.Title>

                <Card.Text>{pet.breed} - {capitalize(pet.gender)} - {pet.age} {pet.age === 1 ? "year" : "years"} old</Card.Text>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to={`/pet_listings/${pet.id}`}><Button variant="outline-primary" size="sm">Details</Button></Link>
                    <small className="text-muted">{pet.shelter.name}</small>
                </div>
            </Card.Body>

            <Card.Img variant="bottom" src={pet.pet_picture ? pet.pet_picture : "/no_image.jpg"} alt="Pet Pic" />
        </Card>
    );
}
