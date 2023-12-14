import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export default function ShelterCard({ shelter }) {

    let address_info = [shelter.address_line_1, shelter.address_line_2, shelter.postal_code]
        .filter(entry => entry.length > 0)
        .join(" - ");

    address_info = address_info.length > 0 ? address_info : "(No address given)";

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Card.Title>{shelter.name}</Card.Title>

                <Card.Text>{address_info}</Card.Text>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to={`/shelter_view/${shelter.underlying_user}`}><Button variant="outline-primary" size="sm">Details</Button></Link>
                    <Link to={`/shelter_comments/${shelter.underlying_user}`}><Button variant="outline-warning" size="sm">Comments</Button></Link>
                </div>
            </Card.Body>

            <Card.Img variant="bottom" src={ shelter.profile_picture ? shelter.profile_picture : "/no_image.jpg" } alt="Shelter Pic" />
        </Card>
    );
}