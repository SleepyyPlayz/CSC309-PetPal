import React, { useState } from 'react';

const Signup = () => {
  const registerUrl = 'http://127.0.0.1:8000/accounts/user/'
  const [formData, setFormData, error, setError] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
    is_shelter: false,
    location: '',
  });

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
  

    fetch(registerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then((response) => {
        if (!response.ok) {
            setError('Registration Failed');
        }
        return response.json();
    })
    }


  return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="tel"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <label>
          Is Shelter:
          <input
            type="checkbox"
            name="is_shelter"
            checked={formData.is_shelter}
            onChange={handleChange}
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            checked={formData.location}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>);
}
export default Signup;