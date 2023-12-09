import React, { useState, useEffect } from 'react';
import '../signup/signup-style.css';
const ShelterDetail = ({isLoggedIn}) => {
  const userId = localStorage.getItem('userId');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const accessToken = localStorage.getItem('access');
  const [new_pass, setnew_pass] = useState('');
  const [profileData, setProfileData] = useState({
    name: '',
    address_line_1: '',
    address_line_2: '',
    postal_code: '',
  });
  
  useEffect(() => {
    const getProfile = async () => {
      try {
        
        const response = await fetch(`http://127.0.0.1:8000/accounts/shelter/${userId}/`, {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
    console.log(isLoggedIn)
    if (isLoggedIn === true) {
      getProfile();
      console.log(profileData);
    }
    else {
      console.log("invalid token");
    }
  
  
  }, []);

    const handleChange = (event) => {
      const { name, value } = event.target;
      // Update the profileData state as the user types
      setProfileData({ ...profileData, [name]: value });
    };
    const handlePWChange = (event) => {
      const value = event.target.value
      // Update the profileData state as the user types
      setnew_pass(value);
    };
    
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    var skipFlag = false;
    if (new_pass !== '') {
      profileData.password = new_pass;
    }
    else {
      delete profileData.password
    }
    fetch(`http://127.0.0.1:8000/accounts/shelter/${userId}/profile/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(profileData),
    })
    .then((response) => {
      if (response.ok) {
        setError("")
        setSuccess("Shelter profile updated!")
        skipFlag = true;
        return ""
      }
      return response.json()
    })
    .then((json) => {
      if (!skipFlag) {
        setError("Error updating profile")
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
  
      <div className="container-sm">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 id="create-your-account">Shelter Profile</h2>


        <div className="form-group">
        <input
          type="text"
          name="name"
          className="form-control"
          value={profileData.name}
          onChange={handleChange}
          placeholder="Shelter Name"
        />
        </div>

        <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="address_line_1"
          value={profileData.address_line_1}
          onChange={handleChange}
          placeholder="Address Line 1"
        />
        </div>

        <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="address_line_2"
          value={profileData.address_line_2}
          onChange={handleChange}
          placeholder="Address Line 2"
        />
        </div>
       

        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="postal_code"
            value={profileData.postal_code}
            onChange={handleChange}
            placeholder='Postal Code'
          />
        
        </div>
        <div className="form-group">
        <button id="submit-button" className="btn btn-success btn-block" type="submit">Save</button>
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

export default ShelterDetail;