import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BlogComment() {
    const [comments, setComments] = useState(null);
    const { id } = useParams();


    useEffect(() => {
        console.log('Rendering comments'); // Add this line

        const apiUrl = `http://127.0.0.1:8000/comments/shelter_blog/${id}/`
        const token = localStorage.getItem('access');
        const headers = { 'Authorization': `Bearer ${token}` };
        // axios.get(`http://localhost:8000/api/pets/${id}/`)
        //   .then(response => setPet(response.data))
        //   .catch(error => console.error('Error fetching data:', error));
    
        fetch(apiUrl, {headers})

          .then(response => response.json())
          .then(data => setComments(data.results))

          .catch(error => {
            console.error('Error fetching comments:', error);
          });
      }, [id]);

      if (!comments) {
        return <div>Loading...</div>;
      }

      const renderReplies = (comment) => (
        <div key={comment.id} style={{marginLeft: '20px'}}>
            <p>{comment.text}</p>
            {comment.replies && comment.replies.length > 0 && (
                <div style={{ marginLeft: '20px' }}>
                    {comment.replies.map(reply => renderReplies(reply))}
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
        </head>

        <main>
        <div>
            {comments.map(comment => (   
                           
              <div key={comment.id}>
                {comment.parent_comment == null && (
                  <div>
                    <p>{comment.text}</p>
                    {comment.replies.map(comment => renderReplies(comment))}
                  </div>
                  
                )}

              </div>
            ))}
        </div>

        </main>
        </>
      );


    
}

export default BlogComment;