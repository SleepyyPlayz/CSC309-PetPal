import React, { useState } from 'react';
import './signup-style.css';

const Signup = () => {
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
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
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
            })
           
        }
        setError("")
        setSuccess("Registration Success")
        return ""
      }
      return response.json()
    })
    .then((json) => {
      if (!skipFlag) {
        setError("Registration Failed")
        setSuccess("")
        console.log(json)
        return json
      }
      
      })
    }



    const bootstrapCSS = (
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />
    );

  return (
    <>
      {bootstrapCSS}
  
      <div className="container-sm" id="form-auth">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 id="create-your-account">Create a new PetPal account</h2>
        <div className="form-group" id="choose-acc-type">
          <label>
            Are you a shelter? {'  '}
            <input
              type="checkbox"
              name="is_shelter"
              checked={formData.is_shelter}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className = "row form-group">
          <div className="col-md-6">
              <input
                type="text"
                name="first_name"
                className="form-control"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
              />

          </div>
          <div className="col-md-6">
              <input
                type="text"
                name="last_name"
                className="form-control"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
              />
          </div>
        </div>

        <div className="form-group">
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        </div>

        <div className="form-group">
        <input
          type="password"
          name="password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        </div>
        <div className="form-group">
        <input
          type="tel"
          className="form-control"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        </div>
       

        <div className="form-group">
        
          
          <input
            className="form-control"
            type="text"
            name="location"
            checked={formData.location}
            onChange={handleChange}
            placeholder="Location"
          />
        
        </div>
        <div className="form-group">
        <button id="submit-button" className="btn btn-success btn-block" type="submit">Sign Up</button>
        </div>
        <div className="form-group">
          <p className="error">{error}</p>
          <p className="success">{success}</p>
        </div>
        
      
      </form>
      </div>
     </>
  );
}
export default Signup;