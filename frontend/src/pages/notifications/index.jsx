import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from "react-bootstrap";

import NotificationList from "../../components/NotificationList";

const Notifications = () => {

    return (
        <Container>
            <h1>Notifications</h1>

            <NotificationList />
        </Container>
        
    );
};

export default Notifications;