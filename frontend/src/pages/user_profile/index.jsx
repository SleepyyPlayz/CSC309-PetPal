import React, { useState, useEffect } from 'react';
import '../signup/signup-style.css';
const UserDetail = ({isLoggedIn}, {handleSignOut}) => {
  const userId = localStorage.getItem('userId');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const accessToken = localStorage.getItem('access');
  const [new_pass, setnew_pass] = useState('');
  const [pfpChanged, setpfpChanged] = useState(false);
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [profileData, setProfileData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    location: '',
    phone_number: '',
    profile_picture: null,
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

  const handleProfilePictureChange = (e) => {
      const file = e.target.files[0];

      setProfileData({
        ...profileData,
        profile_picture: file
      });
      setpfpChanged(true);
      const imageURL = URL.createObjectURL(file);
      setProfilePictureURL(imageURL);
    };

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

    const handleDeleteProfile = async () => {
        const response = await fetch(`http://127.0.0.1:8000/accounts/user/${userId}/profile/`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          localStorage.removeItem('access');
          localStorage.removeItem('id');
          localStorage.removeItem('is_shelter');
          window.location.href = '/login';
          console.log('Profile deleted successfully.');
    
        } else {
          console.error('Failed to delete profile.');
        }
    };
    
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      Object.entries(profileData).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
          console.log(key);
          console.log(value);
          console.log('here')
        }
     
      });
      if (pfpChanged === false) {
        formData.delete('profile_picture');
      }
      if (new_pass !== '') {
        formData.set('password', new_pass);
      } else {
        formData.delete('password');
      }

      for (let pair of formData.entries()) {
        console.log('newpairs');
        console.log(pair[0], pair[1]);
      }
     
      try {
        const response = await fetch(`http://127.0.0.1:8000/accounts/user/${userId}/profile/`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          body: formData,
        });
    
        if (response.ok) {
          setError('');
          setSuccess('Profile updated!');
        } else {
          const json = await response.json();
          setError('Error updating profile');
          setSuccess('');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };


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
        <div className = "pfp-container">
        <label htmlFor="profile-picture-input">
          <img
            src={profilePictureURL || (profileData.profile_picture !== null ? `${profileData.profile_picture}` : "/no_image.jpg")}
            alt="Profile"
            className="profile-picture"
          />
        </label>

       
        </div>
        <div className="form-group">
        <input
          type="file"
          id="profile-picture-input"
          accept="image/*"
          onChange={handleProfilePictureChange}
        />
        </div>

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
          onChange={handlePWChange}
          placeholder="New Password"
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


        <div className='row form-group'>
        <div className="col-md-6">
        <button id="submit-button" className="btn btn-success btn-block" type="submit">Save</button>
        </div>
       
        <div className="col-md-6">
               <button className="btn btn-danger btn-block" onClick={handleDeleteProfile}>Delete Profile</button>
        </div>
        
 
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