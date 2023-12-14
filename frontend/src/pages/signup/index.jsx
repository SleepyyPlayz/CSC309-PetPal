import React, { useState } from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// import './signup-style.css';


export default function Signup () {

    const registerUrl = 'http://127.0.0.1:8000/accounts/user/'

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone_number: '',
        is_shelter: false,
        location: '',
        profile_picture: null,
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;  // checkbox must either be true or false
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };

    const handleSubmit = async (e) => {
        console.log(JSON.stringify(formData));
        e.preventDefault();
        var skipFlag = false;

        fetch(registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => {
            if (response.ok) {
                skipFlag = true;
                if (formData.is_shelter === true) {
                    fetch('http://127.0.0.1:8000/api/token/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: formData.email,
                            password: formData.password,
                        }),
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        const accessToken = data.access;
                        fetch('http://127.0.0.1:8000/accounts/shelter/', {
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                name: formData.email,
                                profile_picture: formData.id,
                            }),
                        })
                    });
                }
                setError("");
                setSuccess("Registration Success! You can log in now.");
                return "";
            }
            return response.json();
        })
        .then((json) => {
            if (!skipFlag) {
                setError("Registration Failed. Please ensure all fields are valid.");
                setSuccess("");
                console.log(json);
                return json;
            }
        })
    }

    return (
        <Container fluid="sm" style={ styling.formContainer }>
            <Form onSubmit={ handleSubmit } style={ styling.form }>

                <h2 style={ styling.banner }>Sign Up</h2>

                <Form.Group style={ styling.formGroup } id="choose-acc-type">
                    <Form.Check
                        type="switch"
                        name="is_shelter"
                        checked={ formData.is_shelter }
                        onChange={ handleChange }
                        label="Do you represent a shelter?"
                    />
                </Form.Group>

                <Form.Group style={ styling.formGroup }>
                    <Form.Control type="text" name="first_name" placeholder="First Name" value={ formData.first_name } onChange={ handleChange } required />
                </Form.Group>

                <Form.Group style={ styling.formGroup }>
                    <Form.Control type="text" name="last_name" placeholder="Last Name" value={ formData.last_name } onChange={ handleChange } required />
                </Form.Group>

                <Form.Group style={ styling.formGroup }>
                    <Form.Control type="email" name="email" placeholder="Email" value={ formData.email } onChange={ handleChange } required />
                </Form.Group>

                <Form.Group style={ styling.formGroup }>
                    <Form.Control type="password" name="password" placeholder="Password" value={ formData.password } onChange={ handleChange } required />
                </Form.Group>

                <Form.Group style={ styling.formGroup }>
                    <Form.Control type="tel" name="phone_number" placeholder="Phone Number (XXX-XXX-XXXX)" value={ formData.phone_number } onChange={ handleChange } required />
                </Form.Group>

                <Form.Group style={ styling.formGroup }>
                    <Form.Control type="text" name="location" placeholder="Location (City)" value={ formData.location } onChange={ handleChange } required />
                </Form.Group>

                <Form.Group style={ styling.formGroup }>
                    <Button variant="success" type="submit" className="d-block">Sign Up</Button>
                </Form.Group>

                <Form.Group style={ styling.formGroup }>
                    <p style={ styling.error }>{error}</p>
                    <p style={ styling.success }>{success}</p>
                </Form.Group>

            </Form>
        </Container>
    );
};

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
    success : {
        color: "green",
    },
};
