import React, { useState, useEffect } from 'react';
import '../signup/signup-style.css';
const UserDetail = ({isLoggedIn}) => {
  const userId = localStorage.getItem('userId');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const accessToken = localStorage.getItem('access');
  const new_pass = '';
  const [profileData, setProfileData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    location: '',
    phone_number: '',
    profile_picture: '',
  });
  
  useEffect(() => {
    const getProfile = async () => {
      try {
        
        const response = await fetch(`http://127.0.0.1:8000/accounts/user/${userId}/`, {
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
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    var skipFlag = false;
    if (new_pass !== '') {
      profileData.password = new_pass;
    }
    else {
      delete profileData.password
    }
    fetch(`http://127.0.0.1:8000/accounts/user/${userId}/profile/`, {
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
        setSuccess("Profile updated!")
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
        <h2 id="create-your-account">User Profile</h2>

        <div className = "row form-group">
            <div className="col-md-6">
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  value={profileData.first_name}
                  onChange={handleChange}
                  
                />

</div>
<div className="col-md-6">
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  value={profileData.last_name}
                  onChange={handleChange}
                  placeholder={profileData.last_name}
                />
          </div>
        </div>

        <div className="form-group">
        <input
          type="email"
          name="email"
          className="form-control"
          value={profileData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        </div>

        <div className="form-group">
        <input
          type="password"
          name="password"
          className="form-control"
          value={new_pass}
          onChange={handleChange}
          placeholder="Password"
        />
        </div>
        <div className="form-group">
        <input
          type="tel"
          className="form-control"
          name="phone_number"
          value={profileData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        </div>
       

        <div className="form-group">
        
          
          <input
            className="form-control"
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleChange}
         
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

export default UserDetail;