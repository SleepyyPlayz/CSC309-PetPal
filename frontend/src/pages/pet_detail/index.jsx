import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';


export default function PetDetail() {
    const [pet, setPet] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = `http://127.0.0.1:8000/pet_listings/${id}/`
        // axios.get(`http://localhost:8000/api/pets/${id}/`)
        //   .then(response => setPet(response.data))
        //   .catch(error => console.error('Error fetching data:', error));

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setPet(data))
            .catch(error => {
                console.error('Error fetching pets:', error);
            });
    }, [id]);

    const handleApply = () => {
        // Redirect to the application page with the pet ID in the URL
        navigate(`/applications/${id}`);
    };

    if (!pet) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Row xs={1} md={2} className="mx-auto d-flex align-items-top g-4 mt-2 mb-1 mx-5">
                <Col>
                    <img src={pet.pet_picture !== null ? `${pet.pet_picture}` : "/no_image.jpg"} alt="Pet Pic" className="img-fluid card" />
                </Col>

                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className='mb-3'>{pet.pet_name}</Card.Title>
                            <Card.Text>{pet.breed}</Card.Text>
                            <Card.Text>{pet.location}</Card.Text>
                            <Card.Text>From: {pet.shelter.name}</Card.Text>
                            <Card.Text>Gender: {pet.gender}</Card.Text>
                            <Card.Text>Age: {pet.age}</Card.Text>
                            <Card.Text>Behavior: Not in model yet</Card.Text>
                            <Card.Text>Health: Not in model yet</Card.Text>

                            <Card.Text>Description:
                                Not in model yet
                            </Card.Text>

                            <Card.Text>Adoption fee: not in model yet</Card.Text>
                            
                            <Button variant="outline-success" size="lg" onClick={handleApply} className="adopt-button">Adopt Me!</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}