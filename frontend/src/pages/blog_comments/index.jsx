import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BlogComment() {
    const [comments, setComments] = useState(null);
    const [newCommentText, setNewCommentText] = useState('');
    const [replyText, setReplyText] = useState('');
    const [parentCommentId, setParentCommentId] = useState(null);
    const { id } = useParams();
    const [nextPage, setNextPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(`http://127.0.0.1:8000/comments/shelter_blog/${id}/`);
    const [previousPage, setPreviousPage] = useState(null);
    const [updateReplies, setUpdateReplies] = useState(false);
    const [pet, setPet] = useState(null);



    useEffect(() => {
      const accessToken = localStorage.getItem('access');
      // else {
      //     window.location.href = '/login';
      // }
      
      const apiUrl = `http://127.0.0.1:8000/shelter_blogs/${id}/`
      // axios.get(`http://localhost:8000/api/pets/${id}/`)
      //   .then(response => setPet(response.data))
      //   .catch(error => console.error('Error fetching data:', error));
      console.log(accessToken);
          fetch(apiUrl, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${accessToken}`,
              },
          })
        .then(response => response.json())
        .then(data => setPet(data))
        .catch(error => {
          console.error('Error fetching pets:', error);
        });
    }, [id]);

    useEffect(() => {
        console.log('Rendering comments'); // Add this line

        // const apiUrl = `http://127.0.0.1:8000/comments/shelter_blog/${id}/`
        const token = localStorage.getItem('access');
        const headers = { 'Authorization': `Bearer ${token}` };
        // axios.get(`http://localhost:8000/api/pets/${id}/`)
        //   .then(response => setPet(response.data))
        //   .catch(error => console.error('Error fetching data:', error));
    
        fetch(currentPage, {headers})

          .then(response => response.json())
          .then(data => {
            setComments(data.results);
            setNextPage(data.next);
            if (data.hasOwnProperty('previous')){
              setPreviousPage(data.previous);
            } else {
              setPreviousPage(null);
            }
          })

          .catch(error => {
            console.error('Error fetching comments:', error);
          });
      }, [currentPage, updateReplies]);

      const handleCommentSubmit = () => {
        if (newCommentText.trim() === '') {
          alert('Please enter a non-empty comment');
          return;
        }
        
        const apiUrl = `http://127.0.0.1:8000/comments/shelter_blog/${id}/`;
        const token = localStorage.getItem('access');

        fetch(apiUrl, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add your authentication token if required
          },
          body: JSON.stringify({
            text: newCommentText,
            // Add other necessary fields
          }),
        })
        .then(request => request.json())
        .then(data => {
          setComments([data, ...comments]);
          setNewCommentText('');
        })
        .catch(error => console.error('Error submitting comment:', error));
      };

      const handleReplySubmit = () => {
        // Submit reply to a comment
        if (replyText.trim() === '') {
          alert('Please enter a non-empty reply');
          return;
        }
        const apiUrl = `http://127.0.0.1:8000/comments/shelter_blog/${id}/`;
        const token = localStorage.getItem('access');

        fetch(apiUrl, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add your authentication token if required
          },
          body: JSON.stringify({
            text: replyText,
            parent_comment: parentCommentId,
            // Add other necessary fields
          }),
        })
        .then(response => response.json())
        .then(data => {
            const updatedComments = comments.map(comment =>
                comment.id === parentCommentId
                    ? { ...comment, replies: [data, ...comment.replies] }
                    : comment
            );
            setComments(updatedComments);
            setReplyText('');
            setParentCommentId(null);
            setUpdateReplies(!updateReplies);
        })
        .catch(error => console.error('Error submitting reply:', error));
      };

      const handleReplyClick = (commentId) => {
        setParentCommentId(commentId);
      };

      if (!comments) {
        return <div>Loading...</div>;
      }

      if (!pet) {
        return <div>Loading...</div>;
      }

      const renderReplies = (comment) => (
        <div key={comment.id} style={{marginLeft: '20px'}}>
            <div className="card mb-3 h-100">
                      <div className="row g-0">
                        <div className="col-4">
                          <img src={comment.user.profile_picture ? `${comment.user.profile_picture}` : "/no_image.jpg" } class="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div className="col-8">
                          <div className="card-body">
                            <h5 className="card-title">{comment.user.first_name} {comment.user.last_name}</h5>
                            <p className="card-text"> {comment.text} </p>
                          </div>
                        </div>
                      </div>
                    </div>
            {comment.replies && comment.replies.length > 0 && (
                <div style={{ marginLeft: '20px' }}>
                    {comment.replies.map(reply => renderReplies(reply))}
                </div>
            )}
            <button className="btn btn-primary mb-3" onClick={() => handleReplyClick(comment.id)}>Reply</button>
            {parentCommentId === comment.id && (
                // <div>
                //     <input
                //         type="text"
                //         value={replyText}
                //         onChange={(e) => setReplyText(e.target.value)}
                //         placeholder="Type your reply"
                //     />
                //     <button onClick={handleReplySubmit}>Submit Reply</button>
                // </div>
                <div>
                  <div className="mb-3">
                    <label class="form-label">New Reply</label>
                    <textarea
                        type="text"
                        className="form-control"
                        rows="3"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply"
                    />
                  </div>
                  <button className="btn btn-primary mb-3" onClick={handleReplySubmit}>Submit Reply</button>
                </div>
            )}
        </div>
      );

      if (!pet) {
        return <div>Loading...</div>;
      }

      return(
        <>
          <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Pet Pal Project</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"/>
            {/* <link href="style.css" rel="stylesheet"/> */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        </head>

        <main>
        <div className="container mx-auto align-items-center row row-cols-1 row-cols-md-2 g-4 mt-2 mb-1 mx-5">
                <div className="col">
                    <img src={pet.image!== null ? `${pet.image}` : "/no_image.jpg" } alt="Pet Pic" className="img-fluid card" />
                </div>

                <div className="col">
                    <div className="card" >
                        <div className="card-body">
                            <h1 className="card-title">{pet.title}</h1>
                            <p className="card-text">{pet.shelter.name}</p>
                            <p className="card-text">{pet.text}</p>
                            
                      

                        </div>
                    </div>
                </div>

            </div>


        <div className="container mx-auto row justify-content-center g-0 mx-4 mt-2 px-3">

            <div>
              <div className="mb-3">
                <label class="form-label">New Comment</label>
                <textarea
                    type="text"
                    className="form-control"
                    rows="3"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Type your comment"
                />
              </div>
              <button className="btn btn-primary mb-3" onClick={handleCommentSubmit}>Submit Comment</button>
            </div>
          

            {comments.map(comment => (   
                           
              <div key={comment.id}>
                {comment.parent_comment == null && (
                  <div>
                    <div className="card mb-3 h-100">
                      <div className="row g-0">
                        <div className="col-4">
                          <img src={comment.user.profile_picture ? `${comment.user.profile_picture}` : "/no_image.jpg" } class="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div className="col-8">
                          <div className="card-body">
                            <h5 className="card-title">{comment.user.first_name} {comment.user.last_name}</h5>
                            <p className="card-text"> {comment.text} </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {comment.replies.map(comment => renderReplies(comment))}
                    <button className="btn btn-primary mb-3" onClick={() => handleReplyClick(comment.id)}>Reply</button>
                    {parentCommentId === comment.id && (
                        <div>
                          <div className="mb-3">
                            <label class="form-label">New Reply</label>
                            <textarea
                                type="text"
                                className="form-control"
                                rows="3"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Type your reply"
                            />
                          </div>
                          <button className="btn btn-primary mb-3" onClick={handleReplySubmit}>Submit Reply</button>
                        </div>
                    )}

                  </div>
                  
                  
                )}

              </div>
            ))}
            
        </div>
        {nextPage && (
              <button className="btn btn-secondary" onClick={() => setCurrentPage(nextPage)}>
                Next Page
              </button>
            )}
          
          {previousPage && (
              <button className="btn btn-secondary" onClick={() => setCurrentPage(previousPage)}>
                Previous Page
              </button>
            )}
        

        </main>
        </>
      );


    
}

export default BlogComment;