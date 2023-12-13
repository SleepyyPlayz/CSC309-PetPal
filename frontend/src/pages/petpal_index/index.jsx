import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';

import PetListingCard from '../../components/PetListingCard';


const PetList = () => {
    const navigate = useNavigate()

    const [pets, setPets] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(`http://127.0.0.1:8000/pet_listings/`);
    const [previousPage, setPreviousPage] = useState(null);
    const [filterValues, setFilterValues] = useState({
        shelter: '',
        status: '',
        breed: '',
        species: '',
        age: '',
        ordering: '',
    });
    const [shelters, setShelters] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [queryParams, setQueryParams] = useState('');

    const handleFilterChange = (filter, value) => {
        setFilterValues((prevValues) => ({
            ...prevValues,
            [filter]: value,
        }));
    };

    const performSearch = () => {
        const currentQueryParams = new URLSearchParams(filterValues);
        const newUrl = `http://localhost:8000/pet_listings/?${currentQueryParams.toString()}`;
        setQueryParams(currentQueryParams.toString());
        setPageNum(1);
        setCurrentPage(newUrl);
    };

    useEffect(() => {
        // Fetch the list of shelters
        fetch('http://localhost:8000/accounts/shelters/?limit=100')  // Replace with your actual endpoint
            .then((response) => response.json())
            .then((data) => {
                setShelters(data.results);
            })
            .catch((error) => {
                console.error('Error fetching shelters:', error);
            });
    }, []);

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
                setPets(data.results);
                setNextPage(data.next);
                if (data.hasOwnProperty('previous')) {
                    setPreviousPage(data.previous);
                } else {
                    setPreviousPage(null);
                }
                navigate(`?page=${pageNum}&${queryParams.toString()}`);
            })
            .catch(error => {
                console.error('Error fetching pets:', error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]); // Run this effect when nextPage changes

    return (
        <Container className="mb-5">
            <Container className="text-center">
                <Row>
                    <Col> <h1 className="fw-light">Welcome to PetPal!</h1> </Col>
                </Row>
                <Row>
                    <Col> <p className="lead text-muted">Find Your Pet Today:</p> </Col>
                </Row>
            </Container>

            <Container fluid>
                <Form>
                    <Row className="justify-content-center" lg={7}>
                        <Col>
                            <Form.Label className="ms-3">
                                Shelter:
                                <Form.Select className="mb-3" value={filterValues.shelter} 
                                    onChange={(e) => { 
                                        handleFilterChange('shelter', e.target.value);
                                    }}
                                >
                                    <option value="">All Shelters</option>
                                    { shelters.map((shelter) => (
                                        <option key={shelter.underlying_user} value={shelter.underlying_user}>{shelter.name}</option>
                                    )) }
                                </Form.Select>
                            </Form.Label>
                        </Col>
                        
                        <Col>
                            <Form.Label className="ms-3">
                                Status:
                                <Form.Select className="mb-3" value={filterValues.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
                                    <option value="">All</option>
                                    <option value="available">Available</option>
                                    <option value="adopted">Adopted</option>
                                    <option value="pending">Pending</option>
                                    <option value="withdrawn">Withdrawn</option>
                                </Form.Select>
                            </Form.Label>
                        </Col>
                        
                        <Col>
                            <Form.Label className="ms-3">
                                Breed:
                                <Form.Control type="text" value={filterValues.breed} onChange={(e) => handleFilterChange('breed', e.target.value)} />
                            </Form.Label>        
                        </Col>

                        <Col>
                            <Form.Label className="ms-3">
                                Species:
                                <Form.Select className="mb-3" value={filterValues.species} onChange={(e) => handleFilterChange('species', e.target.value)}>
                                    <option value="">All</option>
                                    <option value="dog">Dog</option>
                                    <option value="cat">Cat</option>
                                    <option value="bird">Bird</option>
                                    <option value="rabbit">Rabbit</option>
                                </Form.Select>
                            </Form.Label>
                        </Col>

                        <Col>
                            <Form.Label className="ms-3">
                                Age:
                                <Form.Control type="number" min="1" value={filterValues.age} placeholder="1"
                                    onChange={(e) => handleFilterChange('age', e.target.value)}
                                />
                            </Form.Label>
                        </Col>

                        <Col>
                            <Form.Label className="ms-3">
                                Ordering:
                                <Form.Select className="mb-3" value={filterValues.ordering} onChange={(e) => handleFilterChange('ordering', e.target.value)}>
                                    <option value="">None</option>
                                    <option value="age">Age</option>
                                    <option value="pet_name">Pet Name</option>
                                </Form.Select>
                            </Form.Label>
                        </Col>

                        <Col>
                            <Button variant="primary" className="mt-4" onClick={ performSearch }>Filter</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>

            <Container className="py-1">
                <Row xs={1} md={2} lg={3} className="g-3">
                    { pets.map(pet => (
                        <Col className='d-flex align-items-stretch'>
                            <PetListingCard pet={pet} />
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

export default PetList;
