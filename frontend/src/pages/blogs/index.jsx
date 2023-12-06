import React, { useEffect, useState } from 'react';


const Blogs = () => {

  const [blogs, setBlogs] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [preNextPage, setPreNextPage] = useState(null);

  useEffect(() => {
    // Define the API endpoint for your pets
    const apiUrl = nextPage || 'http://127.0.0.1:8000/shelter_blogs/';
    const token = localStorage.getItem('access');
    const headers = { 'Authorization': `Bearer ${token}` };

    // Uncomment the following lines if you are using Axios
    /*
    axios.get(apiUrl)
      .then(response => {
        setPets(prevPets => [...prevPets, ...response.data.results]);
        setNextPage(response.data.next);
      })
      .catch(error => {
        console.error('Error fetching pets:', error);
      });
    */

    // Using the Fetch API
    fetch(apiUrl, {headers})
      .then(response => response.json())
      .then(data => {
        setBlogs(prevBlogs => [...prevBlogs, ...data.results]);
        setPreNextPage(data.next);
      })
      .catch(error => {
        console.error('Error fetching pets:', error);
      });
  }, [nextPage]); // Run this effect when nextPage changes



  return (
    <>
    
    
      <h1>Blog Articles</h1>
      <div>
        {blogs.map(blog => (
          <li key={blog.id}>{blog.title} - {blog.text}</li>
          ))}
      </div>

      <div>
      {preNextPage && (
              <button onClick={() => setNextPage(preNextPage)}>
                Load More
              </button>
            )}
      </div>
    
    </>)
  };
  
  export default Blogs;