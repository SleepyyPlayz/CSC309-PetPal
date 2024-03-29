import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ShelterComment() {
    const [comments, setComments] = useState(null);
    const [newCommentText, setNewCommentText] = useState('');
    const [newCommentRating, setNewCommentRating] = useState('1');
    const [replyText, setReplyText] = useState('');
    const [parentCommentId, setParentCommentId] = useState(null);
    const { id } = useParams();
    const [nextPage, setNextPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(`http://127.0.0.1:8000/comments/shelter/${id}/`);
    const [previousPage, setPreviousPage] = useState(null);
    const [updateReplies, setUpdateReplies] = useState(false);


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
        const apiUrl = `http://127.0.0.1:8000/comments/shelter/${id}/`;
        const token = localStorage.getItem('access');

        fetch(apiUrl, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add your authentication token if required
          },
          body: JSON.stringify({
            text: newCommentText,
            rating: newCommentRating,
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
        if (replyText.trim() === '') {
          alert('Please enter a non-empty reply');
          return;
        }
        // Submit reply to a comment
        const apiUrl = `http://127.0.0.1:8000/comments/shelter/${id}/`;
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
            rating: newCommentRating,
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

      return(
        <>
          <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Pet Pal Project</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"/>
            {/* <link href="style.css" rel="stylesheet"/> */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <link href="style.css" rel="stylesheet"/>  

        </head>

        <main>
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
                <label class="form-label">Rating</label>
                <input
                    type="number"
                    className="form-control"
                    value={newCommentRating}
                    onChange={(e) => setNewCommentRating(e.target.value)}
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
                            <img src={`/${comment.rating}_stars.jpg` } className="img-fluid mb-2" style={{ maxHeight: 50 }} alt="..."/>
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
                          <button onClick={handleReplySubmit}>Submit Reply</button>
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

export default ShelterComment;