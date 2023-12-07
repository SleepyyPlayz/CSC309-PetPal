import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Blogs = () => {

  const [blogs, setBlogs] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [currentPage, setCurrentPage] = useState('http://127.0.0.1:8000/shelter_blogs/');
  const [previousPage, setPreviousPage] = useState(null);
  const [likeStatusChanged, setLikeStatusChanged] = useState(false); // New state for tracking like status changes
  

  useEffect(() => {
    // Define the API endpoint for your pets
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
    fetch(currentPage, {headers})
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
        console.error('Error fetching pets:', error);
      });
  }, [currentPage, likeStatusChanged]); // Run this effect when nextPage changes

  const like = (id) => {
    const likeUrl = `http://127.0.0.1:8000/shelter_blogs/${id}/like/`;
    const token = localStorage.getItem('access');

    fetch(likeUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Add your authentication token if required
      }
    })
    .then(request => request.json())
    .then(data => {
      alert(data.message)
      setLikeStatusChanged(!likeStatusChanged); // Trigger the useEffect when the like status changes
    })
    .catch(error => {
      console.error('Error liking post:', error);
    });
    }



  return (
    <>
    
    
      {/* <h1>Blog Articles</h1>
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
      </div> */}

      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PetPal</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        </head>
      

      <div className="d-flex flex-column min-vh-100">
        <main className="mb-5">
          <section className="py-1 text-center container">
            <div className="row">
              <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">Welcome to PetPal!</h1>
                <p className="lead text-muted">Our Shelter Blogs:</p>
              </div>
            </div>
          </section>

          <div className="album py-1">
            <div className="container">
              <div className="row row-cols-1  row-cols-md-2 g-3">
                {blogs.map(blog => (
                  // <li key={pet.id}>{pet.pet_name}</li>
                  <div className="col" key={blog.id}>
                    <div className="card shadow-sm">
                      <img className="card-img-top" width="100%" src={blog.image !== null ? `${blog.image}` : "/no_image.jpg" } alt="Blog Pic"/>
                      <div className="card-body">
                        <h5 className="card-title">{blog.title}</h5>
                        <p className="card-text">{blog.text}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          {/* <a className="btn btn-sm btn-outline-info me-3" href="pet-detail-page.html">Details</a> */}
                          <button className="btn btn-sm btn-outline-danger me-3" onClick={() => like(blog.id)}>Like </button>
                          <Link to={`/comments/${blog.id}`} className="btn btn-sm btn-outline-primary me-3" >Comments </Link>
                          {/* <small className="text-muted">{pet.shelter.name}</small> */}
                        </div>
                        <p className="card-text">{blog.likes}</p>

                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
          
          {nextPage && (
              <button onClick={() => setCurrentPage(nextPage)}>
                Next Page
              </button>
            )}
          
          {previousPage && (
              <button onClick={() => setCurrentPage(previousPage)}>
                Previous Page
              </button>
            )}

        </main>
      </div>
    
    </>)
  };
  
  export default Blogs;