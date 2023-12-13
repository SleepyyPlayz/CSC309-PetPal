import React from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import not_found_img from '../../assets/404_not_found.png';

export default function NoPage () {
    return (
        <Container>
            <Row className="text-center">
                <Col> <img src={not_found_img} alt="404 not found img" className="width-100" /> </Col>
            </Row>
            <Row className="text-center">
                <Col> <h1>404 : Page Not Found</h1> </Col>
            </Row>
        </Container>
    );
};