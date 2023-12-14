import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// import '../signup/signup-style.css';


export default function Login( { setIsLoggedIn } ) {

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const loginUrl = 'http://localhost:8000/api/token/';

    function handle_submit(event) {
        let data = new FormData(event.target);

        fetch(loginUrl, {
            method: "POST",
            body: data,
        })
        .then(request => request.json())
        .then(json => {
            if ('access' in json) {
                localStorage.setItem('access', json.access);
                localStorage.setItem('userId', json.id);
                localStorage.setItem('email', data.get('email'));
                setIsLoggedIn(true);
                navigate('/');
            }
            else if ('detail' in json) {
                // setError(json.detail);
                setError("Incorrect email or password.");
            }
            else {
                setError("Unknown error while signing in. Please try again later.")
            }
        })
        .catch(error => {
            setError(error);
        });

        event.preventDefault();
    }

    return (
        <Container fluid="sm" style={ styling.formContainer }>
            <Form onSubmit={ handle_submit } style={ styling.form }>

                <h2 style={ styling.banner }>Login</h2>

                <Form.Group style={ styling.formGroup }>
                    <Form.Control type="email" id="email" name="email" placeholder="Email" required />
                </Form.Group>

                <Form.Group style={ styling.formGroup }>
                    <Form.Control type="password" id="password" name="password" placeholder="Password" required />
                </Form.Group>

                <Form.Group style={ styling.formGroup }>
                    { error ? <p style={ styling.error }>{error}</p> : <p></p> }
                    <Button variant="success" type="submit" className="d-block">Login</Button>
                </Form.Group>

            </Form>
        </Container>
    );
}

const styling = {
    formContainer : {
        border: "1px solid grey",
        borderRadius: "20px",
        maxWidth: "500px",
        padding: "45px 10px calc(45px + 16px) 10px",
    },
    banner : {
        textAlign: "center",
        margin: "16px 0.5rem 16px 0.5rem",
    },
    form : {
        maxWidth: "380px",
        margin: "0 auto",
    },
    formGroup: {
        padding: "10px 20px"
    },
    error : {
        color: "red",
    },
};