import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";

export default function Notification ({ notification }) {

    const accessToken = localStorage.getItem('access');
    const typeToStyle = {
        default: 'secondary',
        error: 'danger',
        alert: 'warning',
        checkmark: 'success',
    };

    const notificationClickHandler = () => {
        const _response = fetch(`http://localhost:8000/notifications/${notification.id}/`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
        });
        
        // let nav = useNavigate();
        // nav(notification.link);
    };

    return (
        <Card border={ typeToStyle[notification.notification_type] }>
            { notification.unread ? <Card.Header>Unread Notification!</Card.Header> : <></> }
            <Card.Body>
                {/* <Card.Title>Special title treatment</Card.Title> */}
                <Card.Text>{ notification.message }</Card.Text>
                <Link to={notification.link} onClick={ notificationClickHandler }><Button variant="primary">View</Button></Link>
            </Card.Body>
        </Card>
    );
}