import './App.css';
import Layout from './pages/layout';
import Login from './pages/login';
import Blogs from './pages/blogs';
import PetList from './pages/petpal_index';
import NoPage from './pages/no_page';
import Signup from './pages/signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
    setIsLoggedIn(false);
  };

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout handleSignOut={handleSignOut} isLoggedIn={isLoggedIn}/>}>
        <Route index element={<PetList />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>;
}

export default App;