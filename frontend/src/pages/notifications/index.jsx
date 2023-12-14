import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from "react-bootstrap";

import Form from "react-bootstrap/Form";
import Pagination from 'react-bootstrap/Pagination';

import Notification from "../../components/Notification";


export default function Notifications() {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access');

    const [filterUnread, setFilterUnread] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const [previousPage, setPreviousPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(`http://localhost:8000/notifications/`);
    const [nextPage, setNextPage] = useState(null);

    // Initial:
    useEffect(() => {
        // Ask the user to log in if the user is not logged in when trying to access this page
        if (!accessToken) {
            navigate("../login");
        }

        // If logged in, then grab all notifications
        fetch(`http://localhost:8000/notifications/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(json => {
                setNotifications(json.results);
                setPreviousPage(json.previous);
                setNextPage(json.next);
            })
            .catch(error => {
                console.error('Error fetching notification:', error);
            });
    }, []);

    // Every time filter settings is changed:
    useEffect(() => {
        let queryLink = `http://localhost:8000/notifications/`;
        if (filterUnread) {
            queryLink = queryLink + `?unread=${filterUnread}`;
        }

        fetch(queryLink, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(json => {
                setNotifications(json.results);
                setPreviousPage(json.previous);
                setNextPage(json.next);
            })
            .catch(error => {
                console.error('Error fetching notification:', error);
            });
    }, [filterUnread])

    // Every time we want to switch pages:
    useEffect(() => {
        fetch(currentPage, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(json => {
                setNotifications(json.results);
                setPreviousPage(json.previous);
                setNextPage(json.next);
            })
            .catch(error => {
                console.error('Error fetching notification:', error);
            });
    }, [currentPage])

    return (
        <Container style={styling.outerContainer} className="mb-5">
            <h2 style={styling.banner}>Your Notifications</h2>

            { notifications.length > 0 ? 
                <>
                    <Form className="ms-3 mb-3">
                        <Form.Check
                            type="switch"
                            name="unread"
                            checked={filterUnread}
                            onChange={(event) => {setFilterUnread(event.target.checked);} }
                            label="Display Unread Notifications Only"
                        />
                    </Form>

                    {notifications.map((notification) => <Notification notification={notification} />)}

                    <Container className='mx-1'>
                        <Pagination className='mt-5'>
                            <Pagination.Item disabled={ !previousPage } onClick={() => setCurrentPage(previousPage)}>
                                Previous Page
                            </Pagination.Item>

                            <Pagination.Item disabled={ !nextPage } onClick={() => setCurrentPage(nextPage)}>
                                Next Page
                            </Pagination.Item>
                        </Pagination>
                    </Container>
                </>
            :
                <h6 className="mt-5 text-center">You have no notifications yet.</h6>
            }
        </Container>
    );
};

const styling = {
    outerContainer: {
        border: "1px solid grey",
        borderRadius: "20px",
        maxWidth: "500px",
        padding: "45px 10px calc(45px + 16px) 10px",
    },
    banner: {
        textAlign: "center",
        margin: "16px 0.5rem 16px 0.5rem",
    },
};