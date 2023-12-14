import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyPosts = ({isLoggedIn}) => {
      const shelterId = localStorage.getItem('userId');
      const accessToken = localStorage.getItem('access');
      const [blogs, setBlogs] = useState([]);
      const [nextPage, setNextPage] = useState(null);
      const [currentPage, setCurrentPage] = useState(`http://127.0.0.1:8000/shelter_blogs/${shelterId}/blog-posts/`);
      const [previousPage, setPreviousPage] = useState(null);
      
      const handleDelete = (blogId) => {
        const response = fetch(`http://127.0.0.1:8000/shelter_blogs/${blogId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
          });
      
          if (!response.ok) {
            // Handle errors, e.g., show an error message to the user
            console.error(`Error deleting post: ${response.status}`);
          }
      
          // Post successfully deleted, you can check the response body if needed
          console.log('Post deleted successfully');
          window.location.reload();            
        
      };

      useEffect(() => {
        fetch(currentPage, {
            headers: {
             "Authorization": `Bearer ${accessToken}`, },
         })
          .then(response => response.json())
          .then(data => {
            setBlogs(data.results);
            setNextPage(data.next);
            if (data.hasOwnProperty('previous')){
              setPreviousPage(data.previous);
            } else {
              setPreviousPage(null);
            }
          })
          .catch(error => {
            console.error('Error fetching shelters:', error);
          });

      }, [currentPage]); 

    return (
<>

    <div className="container mt-4">
    <div className="d-flex justify-content-between mt-3 pb-3">
    <Link to="/create_blog" className="btn btn-primary">
      Create a New Blog
    </Link>
  
    </div>
    <ul className="list-group">
      {blogs.map(blog => (
        <li key={blog.id} className="list-group-item">
            <div className="row align-items-center">
                <div className="col-md-4">
            <img className="img-fluid img-thumbnail" style={{ width: '200px', height: '200px' }} src={blog.image}></img>
            </div>
            <div className="col-md-3">
            {blog.title}
            </div>
            <div className="col-md-2">
            <Link className="btn btn-primary" to={`/comments/${blog.id}`}>Comments</Link>
            </div>
           
            <div className="col-md-2">
                <button onClick={() => handleDelete(blog.id)} className="btn btn-danger">Delete</button>
            </div>
       
            </div>
            <p>Likes: {blog.likes}</p>
        </li>
      ))}
    </ul>
    <div className="d-flex justify-content-between mt-3">
      {previousPage && (
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentPage(previousPage)}
        >
          Previous Page
        </button>
      )}
      {nextPage && (
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentPage(nextPage)}
        >
          Next Page
        </button>
      )}
    </div>
  </div>
</>)

}
export default MyPosts;