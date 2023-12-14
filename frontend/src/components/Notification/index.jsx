import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";

export default function Notification({ notification }) {
    const accessToken = localStorage.getItem('access');
    const navigate = useNavigate();

    const typeToStyle = {
        default: 'secondary',
        error: 'danger',
        alert: 'warning',
        checkmark: 'success',
    };

    const notificationClickHandler = async () => {
        const _response = await fetch(`http://localhost:8000/notifications/${notification.id}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        });
    };

    const notificationDeleteHandler = async () => {
        const _response = await fetch(`http://localhost:8000/notifications/${notification.id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        });
        window.location.reload();  // TODO: reload page, temp solution
    };

    return (
        <Card border={typeToStyle[notification.notification_type]} className="mb-3 mx-3">
            {notification.unread ? <Card.Header>Unread Notification!</Card.Header> : <></>}
            <Card.Body>
                <Card.Text>{notification.message}</Card.Text>
                <div className="d-flex justify-content-between">
                    <Link to={notification.link} onClick={notificationClickHandler}><Button variant="primary" size="sm">View</Button></Link>
                    {notification.unread ? <></> : <Button variant="outline-danger" size="sm" onClick={notificationDeleteHandler}>Delete</Button>}
                </div>
            </Card.Body>
        </Card>
    );
}