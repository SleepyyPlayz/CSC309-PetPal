import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from 'react-bootstrap/Pagination';

import ShelterCard from '../../components/ShelterCard';


export default function ShelterList() {
    const navigate = useNavigate()
    const [shelters, setShelters] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(`http://127.0.0.1:8000/accounts/shelters/`);
    const [previousPage, setPreviousPage] = useState(null);
    const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        // Uncomment the following lines if you are using Axios
        /*
        axios.get(apiUrl)
            .then(response => {
                setPets(prevPets => [...prevPets, ...response.data.results]);
                setNextPage(response.data.next);
            })
            .catch(error => {
                console.error('Error fetching pets:', error);
            });
        */

        // Using the Fetch API
        fetch(currentPage)
            .then(response => response.json())
            .then(data => {
                setShelters(data.results);
                setNextPage(data.next);
                if (data.hasOwnProperty('previous')) {
                    setPreviousPage(data.previous);
                } else {
                    setPreviousPage(null);
                }
                navigate(`?page=${pageNum}`);
            })
            .catch(error => {
                console.error('Error fetching pets:', error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);  // Run this effect when currentPage changes

    return (
        <Container className="mb-5">
            <Container className="text-center">
                <Row>
                    <Col> <h1 className="fw-light">Our Shelters</h1> </Col>
                </Row>
                <Row>
                    <Col> <p className="lead text-muted">All of our partnered shelters:</p> </Col>
                </Row>
            </Container>

            <Container className='py-1'>
                <Row xs={1} md={2} lg={3} className="g-3">
                    { shelters.map(shelter => (
                        <Col className='d-flex align-items-stretch'>
                            <ShelterCard shelter={ shelter } />
                        </Col>
                    )) }
                </Row>
            </Container>

            <Container>
                <Pagination className='mt-5'>
                    <Pagination.Item disabled={ !previousPage } onClick={() => { setPageNum(pageNum - 1); setCurrentPage(previousPage); }}>
                        Previous Page
                    </Pagination.Item>

                    <Pagination.Item disabled={ true } >Page: {pageNum}</Pagination.Item>

                    <Pagination.Item disabled={ !nextPage } onClick={() => { setPageNum(pageNum + 1); setCurrentPage(nextPage); }}>
                        Next Page
                    </Pagination.Item>
                </Pagination>
            </Container>

        </Container>
    );
};

