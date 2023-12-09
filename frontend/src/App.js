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
import BlogComment from './pages/blog_comments';
import { BrowserRouter, Route, Routes, Redirect} from 'react-router-dom';
import { verifyToken } from './auth'
import React, {useState, useEffect} from 'react';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      verifyToken(token).then((result) => {
        setIsLoggedIn(result);
      });
    }
  }, []); 

  const handleSignOut = () => {
    localStorage.removeItem('access'); // Remove the token
    localStorage.removeItem('id');
    setIsLoggedIn(false);
    window.location.href= '/login';
  };

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout handleSignOut={handleSignOut} isLoggedIn={isLoggedIn}/>}>
        <Route index element={<PetList />} />
        <Route path="blogs" element={<Blogs />} />
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