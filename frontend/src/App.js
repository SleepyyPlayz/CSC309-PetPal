import './App.css';
import Layout from './pages/layout';
import Login from './pages/login';
import Blogs from './pages/blogs';
import PetList from './pages/petpal_index';
import NoPage from './pages/no_page';
import Signup from './pages/signup';
import Applications from './pages/applications';
import UserDetail from './pages/user_profile';
import PetDetail from './pages/pet_detail';
import MyPosts from './pages/my_posts';
import MyListings from './pages/my_listings';
import BlogComment from './pages/blog_comments';
import { BrowserRouter, Route, Routes, Redirect} from 'react-router-dom';
import { verifyToken } from './auth'
import React, {useState, useEffect} from 'react';
import ShelterDetail from './pages/shelter_profile';

function App() {
  const [isShelter, setIsShelter] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      verifyToken(token).then((result) => {
        setIsLoggedIn(result);
        if (result) {
          const userId = localStorage.getItem('userId');
          fetch(`http://127.0.0.1:8000/accounts/user/${userId}/`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            method: 'GET',
            
          })
          .then((response) => {
            if (response.ok) {

              return response.json();
            }
          })
          .then((userData) => {
            setIsShelter(userData.is_shelter);
            localStorage.setItem('is_shelter', userData.is_shelter);
          })
          };
        })
      }}); 

  const handleSignOut = () => {
    localStorage.removeItem('access'); // Remove the token
    localStorage.removeItem('id');
    localStorage.removeItem('is_shelter');
    setIsShelter(false);
    setIsLoggedIn(false);
    window.location.href= '/login';
  };

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout handleSignOut={handleSignOut} isLoggedIn={isLoggedIn} IsShelter={isShelter}/>}>
        <Route index element={<PetList />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="/shelter_profile" element = {<ShelterDetail isLoggedIn={isLoggedIn}/>} />
        <Route path="/my_posts" element = {<MyPosts IsLoggedIn={isLoggedIn}/>} />
        <Route path="/my_listings" element = {<MyListings IsLoggedIn={isLoggedIn}/>} />
        <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="signup" element={<Signup />} />
        <Route path="applications" element={<Applications />} />
        <Route path="/pet_listings/:id/" element={<PetDetail />} />
        <Route path="/comments/:id/" element={<BlogComment />} />
        <Route path="/user_profile" element = {<UserDetail isLoggedIn={isLoggedIn}/>} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>;
}

export default App;