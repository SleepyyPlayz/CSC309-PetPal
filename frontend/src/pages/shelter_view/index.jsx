// src/components/PetDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';


export default function ShelterView( {isLoggedIn} ) {
    const [pet, setPet] = useState(null);
    const { id } = useParams();
    var accessToken;

    useEffect(() => {
        if (isLoggedIn) {
            accessToken = localStorage.getItem('access');
        }
        else {
            window.location.href = '/login';
        }
        
        const apiUrl = `http://127.0.0.1:8000/accounts/shelter/${id}/`
        // axios.get(`http://localhost:8000/api/pets/${id}/`)
        //   .then(response => setPet(response.data))
        //   .catch(error => console.error('Error fetching data:', error));
        console.log(accessToken);
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then(response => response.json())
        .then(data => setPet(data))
        .catch(error => {
            console.error('Error fetching pets:', error);
        });
    }, [id]);

    if (!pet) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Row xs={1} md={2} className="mx-auto align-items-top g-4 mt-2 mb-1 mx-5">
                <Col>
                    <img src={pet.profile_picture!== null ? `${pet.profile_picture}` : "/no_image.jpg" } alt="Pet Pic" className="img-fluid card" />
                </Col>

                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>{pet.name}</Card.Title>
                            <Card.Text>{pet.address_line_1}</Card.Text>
                            <Card.Text>{pet.address_line_2}</Card.Text>
                            <Card.Text>
                                {/* <a href="shelter-detail-page.html">Toronto Pet Shelter</a> */}
                                {pet.postal_code}
                            </Card.Text>
                      
                            {/* <a href="pet-adoption-form.html" className="btn btn-lg adopt-button">Adopt Me!</a> */}
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Container>
    );
}
