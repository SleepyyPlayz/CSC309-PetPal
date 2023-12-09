import React, { useState, useEffect } from 'react';
import Notification from '../Notification';

export default function NotificationList () {

    const accessToken = localStorage.getItem('access')

    const [filterUnread, setFilterUnread] = useState(false);
    const [notifications, setNotifications] = useState([]);

    
    useEffect(() => {
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
        });
    }, []);

    return (<div>
        { notifications.map((notification) => <Notification notification={notification} />) }
    </div>);
}